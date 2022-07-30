import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, forkJoin, of } from 'rxjs';
import { EventControllerService, EventDto, PublicDataControllerService, SupplierControllerService, SupplierEmployeeDto, UserControllerService, UserResponseDto } from 'src/app/@api';
import { DeleteAccountAlertComponent } from 'src/app/shared/components/alert-conf/delete-account-alert/delete-account-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';

@Component({
  selector: 'app-add-event2',
  templateUrl: './add-event2.component.html',
  styleUrls: ['./add-event2.component.scss']
})
export class AddEvent2Component extends AppBaseComponent implements OnInit, OnDestroy {
  eventDto: EventDto

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture: string;

  eventId: number;

  constructor(
    injector: Injector,
    private _eventControllerService: EventControllerService,
    private _publicDataControllerService: PublicDataControllerService,
    private modalService: BsModalService,

  ) {
    super(injector)
    this.isLoading = true
    this.route.params.subscribe(param => {
      this.eventId = param['id']
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observableGetProfile ;
    if(this.eventId) {
        observableGetProfile = this._publicDataControllerService.getEventByIdUsingGET(this.eventId)
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
      this.eventDto = res[1] ? res[1] : [];

      this.businessLicensePicture = this.eventDto?.image?.reference


      this.fields = [
        {
          className: 'col-12',
          key: 'title',
          type: 'input',
          defaultValue: this.eventDto?.title,
          templateOptions: {
            label: this._translateService.instant('Title'),
            required: true,
          },
        },
        {
          className: 'col-12',
          key: 'businessLicense',
          type: 'upload',

          templateOptions: {
            text: this._translateService.instant('UploadFiles'),
            label: this._translateService.instant('BusinessLicensee'),
            file: this.eventDto?.image?.reference,
          }
        },
        {
          className: 'col-md-6 col-12',
          key: 'eventDate',
          type: 'input',
          defaultValue: this.eventDto?.eventDate ? new Date(this.eventDto?.eventDate).toISOString().split('T')[0] : undefined,
          templateOptions: {
            type: 'date',
            label: this._translateService.instant('eventDate'),
            required: true,
          },
        },
        {
          className: 'col-md-6 col-12',
          key: 'eventEndDate',
          type: 'input',
          defaultValue: this.eventDto?.eventEndDate ? new Date(this.eventDto?.eventEndDate).toISOString().split('T')[0] : undefined,
          templateOptions: {
            type: 'date',
            label: this._translateService.instant('eventEndDate'),
            required: true,
          },
        },
        {
          className: 'col-sm-6 col-12',
          key: 'origin',
          type: 'ng-select',
          defaultValue: this.eventDto?.city?.origin?.originId,
          templateOptions: {
            label: this._translateService.instant('companyLocation'),
            options: res[0]?.map(v => ({ label: v.originName, value: v.originId })),
            change: (f, e) => {
              if (e) {
                const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.model?.origin).subscribe((res: any) => {
                  this.fields.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
                })
                this.unSubscription.push(getCountryCityUsingGETSub)
              }
            }

          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'city',
          type: 'ng-select',
          defaultValue: this.eventDto?.city?.cityLookupId,
          templateOptions: {
            label: this._translateService.instant('city'),
            options: [],

          }
        },
                // {
        //   className: 'col-12',
        //   key: 'city',
        //   type: 'ng-select',
        //   defaultValue: this.eventDto?.city?.cityLookupId,
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
          defaultValue: this.eventDto?.content,
          templateOptions: {
            label: this._translateService.instant('Content'), // later
            rows: 5,
            required: true,
          },
        },
        

      ]
      if(this.eventDto?.city?.origin?.originId) {
        const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.eventDto?.city?.origin?.originId).subscribe((res: any) => {
          this.fields.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
          this.form.get('city')?.setValue(+this.eventDto?.city?.cityLookupId)
          // .userProfile?.address?.city
        })
        this.unSubscription.push(getCountryCityUsingGETSub)
      }
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
    if (this.eventId) {
      let eventDto: EventDto = {
        image: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          content: this.model?.content,
          // city: { cityLookupId: 7 }, // need refactor
          city: { cityLookupId: +this.model?.city}, // need refactor
    
          eventDate: new Date(this.model?.eventDate),
          eventEndDate: new Date(this.model?.eventEndDate),
          title: this.model?.title,
          status: this.model?.status,
          eventId: 5 // this.eventId ? +this.eventId : undefined, later
      }

      const updateUserDetailsUsingPUTSub = this._eventControllerService.updateEventUsingPUT(eventDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: EventDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let eventDto: EventDto = {
        image: {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.businessLicensePicture
          },
          "reference": this.businessLicensePicture},
          content: this.model?.content,
          // city: { cityLookupId: 7 }, // need refactor
          city: { cityLookupId: +this.model?.city}, // need refactor

          // city: { cityLookupId: +this.model?.origin }, // need refactor
    
          eventDate: new Date(this.model?.eventDate),
          eventEndDate: new Date(this.model?.eventEndDate),
          title: this.model?.title,
          status: this.model?.status,
          eventId: 5 // this.eventId ? +this.eventId : undefined, later
      }
      const updateUserDetailsUsingPUTSub = this._eventControllerService.createEventUsingPOST(eventDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: EventDto) => {
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

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `profiles/profile-${this.eventDto?.eventId}/profilePicture`)
    }
    if (this.model?.businessLicense?.length) {
      if (this.isFile(this.model?.businessLicense[0])) {
        this.beforeImagesLoaded?.push(this.model?.businessLicense[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.businessLicense[0]], `profiles/profile-${this.eventDto?.eventId}/businessLicense`)

    }

    if (!this.model?.businessLicense && !this.model2?.UploadProfilePicture?.length) {
      this.updateProfile()
    }



  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('addProfileStorage')
  }
}
