import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, forkJoin, of } from 'rxjs';
import {  NewsControllerService, NewsDto, PublicDataControllerService, SupplierControllerService, SupplierEmployeeDto, UserControllerService, UserResponseDto } from 'src/app/@api';
import { DeleteAccountAlertComponent } from 'src/app/shared/components/alert-conf/delete-account-alert/delete-account-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent extends AppBaseComponent implements OnInit, OnDestroy {
  newDto: NewsDto

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture: string;

  newId: number;

  constructor(
    injector: Injector,
    private _newsControllerService: NewsControllerService,
    private _publicDataControllerService: PublicDataControllerService,
    private modalService: BsModalService,

  ) {
    super(injector)
    this.isLoading = true
    this.route.params.subscribe(param => {
      this.newId = param['id']
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observableGetProfile ;
    if(this.newId) {
        observableGetProfile = this._publicDataControllerService.getNewsByIdUsingGET(this.newId)
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
      console.log('res', res)
      this.newDto = res[1] ? res[1] : [];

      this.businessLicensePicture = this.newDto?.image?.reference


      this.fields = [
        {
          className: 'col-12',
          key: 'title',
          type: 'input',
          defaultValue: this.newDto?.title,
          templateOptions: {
            label: this._translateService.instant('newsTitle'),
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'businessLicense',
          type: 'upload',

          templateOptions: {
            text: this._translateService.instant('UploadFiles'),
            label: this._translateService.instant('newsImage'),
            file: this.newDto?.image?.reference,
          }
        },
        {
          className: 'col-12',
          key: 'lastUpdatedDate',
          type: 'input',
          defaultValue: this.newDto?.lastUpdatedDate ? new Date(this.newDto?.lastUpdatedDate).toISOString().split('T')[0] : undefined,
          templateOptions: {
            type: 'date',
            label: this._translateService.instant('CreationDate'),
            required: true,
          },
        },
                // {
        //   className: 'col-12',
        //   key: 'city',
        //   type: 'ng-select',
        //   defaultValue: this.newDto?.city?.cityLookupId,
        //   templateOptions: {
        //     label: this._translateService.instant('city'),
        //     required: true,
        //     options: res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
        //   },
        // },
        {
          className: 'col-12',
          key: 'content',
          type: 'textarea',
          defaultValue: this.newDto?.content,
          templateOptions: {
            label: this._translateService.instant('NewsDescription'),
            rows: 5,
            required: true,
          },
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
    if (this.newId) {
      let newDto: NewsDto = {
        image: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          content: this.model?.content,
    
          lastUpdatedDate: new Date(this.model?.lastUpdatedDate),
          title: this.model?.title,
          status: this.model?.status,
          newsId: this.newId ? +this.newId : undefined,
      }

      const updateUserDetailsUsingPUTSub = this._newsControllerService.updateNewsUsingPUT(newDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: NewsDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let newDto: NewsDto = {
        image: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          content: this.model?.content,
          lastUpdatedDate: new Date(this.model?.lastUpdatedDate),
          title: this.model?.title,
          status: this.model?.status,
          newsId: this.newId ? +this.newId : undefined,
      }
      const updateUserDetailsUsingPUTSub = this._newsControllerService.createNewsUsingPOST(newDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: NewsDto) => {
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

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `profiles/profile-${this.newDto?.newsId}/profilePicture`)
    }
    if (this.model?.businessLicense?.length) {
      if (this.isFile(this.model?.businessLicense[0])) {
        this.beforeImagesLoaded?.push(this.model?.businessLicense[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.businessLicense[0]], `profiles/profile-${this.newDto?.newsId}/businessLicense`)

    }

    if (!this.model?.businessLicense && !this.model2?.UploadProfilePicture?.length) {
      this.updateProfile()
    }



  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('addProfileStorage')
  }
}
