import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, forkJoin, of } from 'rxjs';
import { FaqControllerService, FaqDto, PublicDataControllerService, SupplierControllerService, SupplierEmployeeDto, UserControllerService, UserResponseDto } from 'src/app/@api';
import { DeleteAccountAlertComponent } from 'src/app/shared/components/alert-conf/delete-account-alert/delete-account-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.scss']
})
export class AddFaqComponent extends AppBaseComponent implements OnInit, OnDestroy {
  faqDto: FaqDto

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture: string;

  faqId: number;

  constructor(
    injector: Injector,
    private _faqControllerService: FaqControllerService,
    private _publicDataControllerService: PublicDataControllerService,
    private modalService: BsModalService,

  ) {
    super(injector)
    this.isLoading = true
    this.route.params.subscribe(param => {
      this.faqId = param['id']
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observableGetProfile ;
    if(this.faqId) {
        observableGetProfile = this._faqControllerService.getFaqByIdUsingGET(this.faqId)
    } else {
      observableGetProfile = of({
        question: '',
        answer: ''
      })
    }
   
    let observables = [
      this.LookupControllerService.getOriginsUsingGET(),
      observableGetProfile,
    ]

    const sub = forkJoin(observables).subscribe((res: any) => {
      this.faqDto = res[1] ? res[1] : [];

      // this.businessLicensePicture = this.faqDto?.image?.reference


      this.fields = [
        {
          className: 'col-12',
          key: 'question',
          type: 'input',
          defaultValue: this.faqDto?.question,
          templateOptions: {
            label: this._translateService.instant('Question'),
            required: true,
          },
        },
        // {
        //   className: 'col-12',
        //   key: 'image',
        //   type: 'upload',

        //   templateOptions: {
        //     text: this._translateService.instant('UploadFiles'),
        //     label: this._translateService.instant('BusinessLicensee'),
        //     file: this.faqDto?.image?.reference,
        //   }
        // },
        // {
        //   className: 'col-md-6 col-12',
        //   key: 'faqDate',
        //   type: 'input',
        //   defaultValue: this.faqDto?.faqDate ? new Date(this.faqDto?.faqDate).toISOString().split('T')[0] : undefined,
        //   templateOptions: {
        //     type: 'date',
        //     label: this._translateService.instant('faqDate'),
        //     required: true,
        //   },
        // },
        // {
        //   className: 'col-md-6 col-12',
        //   key: 'faqEndDate',
        //   type: 'input',
        //   defaultValue: this.faqDto?.faqEndDate ? new Date(this.faqDto?.faqEndDate).toISOString().split('T')[0] : undefined,
        //   templateOptions: {
        //     type: 'date',
        //     label: this._translateService.instant('faqEndDate'),
        //     required: true,
        //   },
        // },
        // {
        //   className: 'col-sm-6 col-12',
        //   key: 'origin',
        //   type: 'ng-select',
        //   defaultValue: this.faqDto?.city?.origin?.originId,
        //   templateOptions: {
        //     label: this._translateService.instant('location'),
        //     options: res[0]?.map(v => ({ label: v.originName, value: v.originId })),
        //     change: (f, e) => {
        //       if (e) {
        //         const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.model?.origin).subscribe((res: any) => {
        //           this.fields.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
        //         })
        //         this.unSubscription.push(getCountryCityUsingGETSub)
        //       }
        //     }

        //   }
        // },
        // {
        //   className: 'col-sm-6 col-12',
        //   key: 'city',
        //   type: 'ng-select',
        //   defaultValue: this.faqDto?.city?.cityLookupId,
        //   templateOptions: {
        //     label: this._translateService.instant('city'),
        //     options: [],

        //   }
        // },
                // {
        //   className: 'col-12',
        //   key: 'city',
        //   type: 'ng-select',
        //   defaultValue: this.faqDto?.city?.cityLookupId,
        //   templateOptions: {
        //     label: this._translateService.instant('city'),
        //     required: true,
        //     options: res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
        //   },
        // },
        {
          className: 'col-12',
          key: 'answer',
          type: 'textarea',
          defaultValue: this.faqDto?.answer,
          templateOptions: {
            label: this._translateService.instant('QuestionReply'), // later
            rows: 5,
            required: true,
          },
        },
        

      ]
      // if(this.faqDto?.city?.origin?.originId) {
      //   const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.faqDto?.city?.origin?.originId).subscribe((res: any) => {
      //     this.fields.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
      //     this.form.get('city')?.setValue(+this.faqDto?.city?.cityLookupId)
      //     // .userProfile?.address?.city
      //   })
      //   this.unSubscription.push(getCountryCityUsingGETSub)
      // }
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
    if (this.faqId) {
      let faqDto: FaqDto = {
        // image: {
          // "attachmentSource": {
          //   "attachmentSourceId": 1,
          //   "attachmentSourceName": this.businessLicensePicture
          // },
          // "reference": this.businessLicensePicture},
          answer: this.model?.answer,
          // city: { cityLookupId: 7 }, // need refactor
          // city: { cityLookupId: +this.model?.city}, // need refactor
    
          // faqDate: new Date(this.model?.faqDate),
          // faqEndDate: new Date(this.model?.faqEndDate),
          question: this.model?.question,
          status: this.model?.status,
          faqId:  this.faqId ? +this.faqId : undefined,
      }

      const updateUserDetailsUsingPUTSub = this._faqControllerService.updateFaqUsingPUT(faqDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: FaqDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let faqDto: FaqDto = {
        // image: {
        //   "attachmentSource": {
        //     "attachmentSourceId": 1,
        //     "attachmentSourceName": this.businessLicensePicture
        //   },
        //   "reference": this.businessLicensePicture},
          answer: this.model?.answer,
          // city: { cityLookupId: 7 }, // need refactor
          // city: { cityLookupId: +this.model?.city}, // need refactor

          // city: { cityLookupId: +this.model?.origin }, // need refactor
    
          // faqDate: new Date(this.model?.faqDate),
          // faqEndDate: new Date(this.model?.faqEndDate),
          question: this.model?.question,
          status: this.model?.status,
          faqId: this.faqId ? +this.faqId : undefined,
      }
      const updateUserDetailsUsingPUTSub = this._faqControllerService.addFaqUsingPOST(faqDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: FaqDto) => {
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

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `faqs/faq-${this.faqDto?.faqId}/profilePicture`)
    }
    if (this.model?.image?.length) {
      if (this.isFile(this.model?.image[0])) {
        this.beforeImagesLoaded?.push(this.model?.image[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.image[0]], `faqs/faq-${this.faqDto?.faqId}/businessLicense`)

    }

    if (!this.model?.image) {
      this.updateProfile()
    }



  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('addProfileStorage')
  }
}
