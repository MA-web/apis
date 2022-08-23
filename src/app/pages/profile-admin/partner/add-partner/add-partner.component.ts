import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, forkJoin, of } from 'rxjs';
import { EventControllerService, PartnerDto, PartnersControllerService, PublicDataControllerService, SupplierControllerService, SupplierEmployeeDto, UserControllerService, UserResponseDto } from 'src/app/@api';
import { DeleteAccountAlertComponent } from 'src/app/shared/components/alert-conf/delete-account-alert/delete-account-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent extends AppBaseComponent implements OnInit, OnDestroy {
  partnerDto: PartnerDto

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture: string;

  partnerId: number;

  constructor(
    injector: Injector,
    private _partnersControllerService: PartnersControllerService,
    private _publicDataControllerService: PublicDataControllerService,
    private modalService: BsModalService,

  ) {
    super(injector)
    this.isLoading = true
    this.route.params.subscribe(param => {
      this.partnerId = param['id']
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observableGetProfile ;
    if(this.partnerId) {
        observableGetProfile = this._partnersControllerService.getPartnerByIdUsingGET(this.partnerId)
    } else {
      observableGetProfile = of({
        title: '',
        content: ''
      })
    }
   
    let observables = [
      this.LookupControllerService.getOriginsUsingGET(),
      observableGetProfile,
    ]

    const sub = forkJoin(observables).subscribe((res: any) => {
      this.partnerDto = res[1] ? res[1] : [];

      this.businessLicensePicture = this.partnerDto?.partnerLogo?.reference


      this.fields = [
        {
          className: 'col-12',
          key: 'partnerName',
          type: 'input',
          defaultValue: this.partnerDto?.partnerName,
          templateOptions: {
            label: this._translateService.instant('PartnerName'),
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'partnerLogo',
          type: 'upload',

          templateOptions: {
            text: this._translateService.instant('UploadFiles'),
            label: this._translateService.instant('PartnerImage'),
            file: this.partnerDto?.partnerLogo?.reference,
          }
        },
       

      ]
      this.isLoading = false

    })


    this.unSubscription.push(sub)


    const resDataSub = this.UploadFileService.resData.subscribe(res => {
      let addProfileStorage
      var Values = [];
      //get olds values
      if (window.localStorage.getItem('addProfileStorage')) {
        addProfileStorage = window.localStorage.getItem('addProfileStorage')
        Values = JSON.parse(addProfileStorage);
      }

      //push new value
      Values.push(res);

      window.localStorage.setItem('addProfileStorage', JSON.stringify(Values))
      if (JSON.parse(window.localStorage.getItem('addProfileStorage'))?.length === this.beforeImagesLoaded?.length) {
        let finalUploaded = JSON.parse(window.localStorage.getItem('addProfileStorage'))

        finalUploaded.forEach(element => {
           if (element.includes('/businessLicense')) {
            this.businessLicensePicture = element
          }

        });


        this.updateProfile()

      }

    })
    this.unSubscription.push(resDataSub)

    const sendEmptyAttachSub = this._sharedService.sendEmptyAttach.subscribe(res => {
      if (res) {
        this.UploadFileService.deleteFile(this.businessLicensePicture)
        this.businessLicensePicture = undefined
      }
    })
    this.unSubscription.push(sendEmptyAttachSub)

  }


  updateProfile() {
    this.isSubmit = true
    console.log(this.model)
    if (this.partnerId) {
      let partnerDto: PartnerDto = {
        partnerLogo: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          partnerName: this.model?.partnerName,
          status: this.model?.status,
          partnerId:  this.partnerId ? +this.partnerId : undefined,
      }

      const updateUserDetailsUsingPUTSub = this._partnersControllerService.updatePartnerUsingPUT(partnerDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: PartnerDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let partnerDto: PartnerDto = {
        partnerLogo: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          partnerName: this.model?.partnerName,
          status: this.model?.status,
          partnerId: this.partnerId ? +this.partnerId : undefined,
      }
      const updateUserDetailsUsingPUTSub = this._partnersControllerService.addPartnerUsingPOST(partnerDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: PartnerDto) => {
        if (res) {
          this.toaster.success(this._translateService.instant("updatedSuccessfully"))
        }

      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    }
  }

  onSubmit() {
    window.localStorage.removeItem('addProfileStorage')
    this.beforeImagesLoaded = []

    if (this.model2?.UploadProfilePicture?.length) {

      this.beforeImagesLoaded?.push(this.model2?.UploadProfilePicture[0])

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `partners/partner-${this.partnerDto?.partnerId}/profilePicture`)
    }
    if (this.model?.partnerLogo?.length) {
      if (this.isFile(this.model?.partnerLogo[0])) {
        this.beforeImagesLoaded?.push(this.model?.partnerLogo[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.partnerLogo[0]], `partners/partner-${this.partnerDto?.partnerId}/businessLicense`)

    }

    if (!this.model?.partnerLogo) {
      this.updateProfile()
    }



  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('addProfileStorage')
  }
}
