import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { finalize, forkJoin } from 'rxjs';
import { ProfileUserProfileDto, SupplierControllerService, SupplierEmployeeDto, UpdateSupplierProfileDto, UserControllerService, UserProfileDto, UserResponseDto } from 'src/app/@api';
import { ProfileDto } from 'src/app/@api/model/profileDto';
import { DeleteAccountAlertComponent } from 'src/app/shared/components/alert-conf/delete-account-alert/delete-account-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile-faq',
  templateUrl: './profile-faq.component.html',
  styleUrls: ['./profile-faq.component.scss']
})
export class ProfileFaqComponent extends AppBaseComponent implements OnInit, OnDestroy {
  ProfileDto: ProfileDto = {}

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture: string;
  profilePicture: string;
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
    private _supplierControllerService: SupplierControllerService,
    private modalService: BsModalService,

  ) {
    super(injector)
    this.isLoading = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observableGetProfile;
    if (this.userData?.role === roles?.customer) {
      observableGetProfile = this._userControllerService.getUserProfileUsingGET()
    } else {
      observableGetProfile = this._supplierControllerService.getSupplierProfileUsingGET()
    }

    let observables = [
      observableGetProfile,
      // this.LookupControllerService.getOriginsUsingGET(),
      // this.LookupControllerService.getEmployeesNumberUsingGET(),
      // this.LookupControllerService.getInterestsUsingGET(),
      // this.LookupControllerService.getAnnualSalesVolumeUsingGET(),
      // this.LookupControllerService.getExportPercentageUsingGET(),
      // this.LookupControllerService.getMainMarketsUsingGET(),
      // this.LookupControllerService.getMainCustomerUsingGET(),
    ]

    const sub = forkJoin(observables).subscribe((res: any) => {
      this.ProfileDto = res[0];

      this.profilePicture = this.ProfileDto?.userProfile?.image?.reference
      this.businessLicensePicture = this.ProfileDto?.company?.businessLicense?.reference





      this.fields2 = [
        {
          className: 'noFormGroup',
          key: 'UploadProfilePicture',
          type: 'file-upload',
          templateOptions: {
            text: this._translateService.instant('uploadNewPicture'),
            icon: './assets/icons/edit.svg'
          },

        },
      ]

      this.fields = [
        {
          className: 'col-sm-6 col-12',
          key: 'firstName',
          type: 'input',
          defaultValue: this.ProfileDto?.user?.firstName,
          templateOptions: {
            label: this._translateService.instant('firstName'),
            readonly: true
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'lastName',
          type: 'input',
          defaultValue: this.ProfileDto?.user?.lastName,
          templateOptions: {
            label: this._translateService.instant('lastName'),
            readonly: true
          }
        },
        {
          className: 'col-12',
          key: 'gender',
          type: 'ng-select',
          defaultValue: this.ProfileDto?.userProfile?.gender,
          templateOptions: {
            label: this._translateService.instant('gender'),
            options: this.getEnumAsOptions(ProfileUserProfileDto.GenderEnum)
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'phone',
          type: 'phone',
          defaultValue: this.ProfileDto?.userProfile?.phone,
          templateOptions: {
            label: this._translateService.instant('telephone'),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'landLine',
          type: 'phone',
          defaultValue: this.ProfileDto?.userProfile?.landLine,
          templateOptions: {
            label: this._translateService.instant('Landline')
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'fax',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.fax,
          templateOptions: {
            label: this._translateService.instant('Fax')
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'skype',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.skype,
          templateOptions: {
            label: this._translateService.instant('Skype')
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'companyName',
          type: 'input',
          defaultValue: this.ProfileDto?.user?.companyName,
          templateOptions: {
            label: this._translateService.instant('Company'),
            readonly: true
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'establishmentDate',
          type: 'input',
          defaultValue: this.ProfileDto?.company?.establishmentDate,
          templateOptions: {
            type: 'date',
            label: this._translateService.instant('EstablishmentDate')
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'origin',
          type: 'ng-select',
          defaultValue: this.ProfileDto?.user?.companyLocation?.originId,
          templateOptions: {
            label: this._translateService.instant('companyLocation'),
            options: res[1].map(v => ({ label: v.originName, value: v.originId })),
            disabled: true,
            change: (f, e) => {
              if (e) {
                const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.model2?.origin).subscribe((res: any) => {
                  this.fields2.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
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
          templateOptions: {
            label: this._translateService.instant('city'),
            options: [],

          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'street',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.address?.street,
          templateOptions: {
            label: this._translateService.instant('Street'),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'postalCode',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.address?.postalCode,
          templateOptions: {
            label: this._translateService.instant('Postal_zip_code'),
            pattern: generalValidations.zip
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.zip')}`,
            },
          },
        },

        {
          className: 'col-sm-6 col-12',
          key: 'website',
          type: 'input',
          defaultValue: this.ProfileDto?.company?.website,
          templateOptions: {
            type: 'url',
            label: this._translateService.instant('Website'),
            pattern: generalValidations.url
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.url')}`,
            },
          },
        },

        {
          className: 'col-sm-6 col-12',
          key: 'numberEmployees',
          type: 'ng-select',
          defaultValue: this.ProfileDto?.company?.numberEmployees,
          templateOptions: {
            label: this._translateService.instant('numEmployees'),
            options: res[2].map(v => ({ label: v?.numberOfEmployeesValue, value: v?.numberOfEmployeesLookupId })),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'title',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.title,
          templateOptions: {
            label: this._translateService.instant('Title'),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'companyType',
          type: 'input',
          defaultValue: this.ProfileDto?.company?.companyType,
          templateOptions: {
            label: this._translateService.instant('Type'),
          }
        },
        {
          className: 'col-12',
          key: 'businessLicense',
          type: 'upload',

          templateOptions: {
            text: this._translateService.instant('UploadFiles'),
            label: this._translateService.instant('BusinessLicensee'),
            file: this.ProfileDto?.company?.businessLicense?.reference,
          }
        },

        {
          className: 'col-12',
          key: 'aboutMe',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.aboutMe,
          templateOptions: {
            label: this._translateService.instant('AboutMe'),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'workingIn',
          type: 'input',
          defaultValue: this.ProfileDto?.userProfile?.workingIn,
          templateOptions: {
            label: this._translateService.instant('WorkingIn'),
            placeholder: this._translateService.instant('keyword')
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'interestedIn',
          type: 'ng-select',
          defaultValue: +this.ProfileDto?.userProfile?.interestedIn,
          templateOptions: {
            label: this._translateService.instant('interestedIn'),
            options: res[3].map(v => ({ label: v?.interestedInValue, value: v?.interestedInLookupId })),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'totalAnnualSales',
          type: 'ng-select',
          defaultValue: +this.ProfileDto?.company?.totalAnnualSales,
          templateOptions: {
            label: this._translateService.instant('Total_annual_sales_volume'),
            options: res[4].map(v => ({ label: v?.annualSalesValue, value: v?.annualSalesLookupId })),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'exportPercentage',
          type: 'ng-select',
          defaultValue: +this.ProfileDto?.company?.exportPercentage,
          templateOptions: {
            label: this._translateService.instant('Export_Percentage'),
            options: res[5].map(v => ({ label: v?.exportPercentageValue, value: v?.exportPercentageLookupId })),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'mainMarkets',
          type: 'ng-select',
          defaultValue: +this.ProfileDto?.company?.mainMarkets,
          templateOptions: {
            label: this._translateService.instant('Main_Markets'),
            options: res[6].map(v => ({ label: v?.mainMarketsValue, value: v?.mainMarketsLookupId })),
          }
        },
        {
          className: 'col-sm-6 col-12',
          key: 'mainCustomer',
          type: 'ng-select',
          defaultValue: +this.ProfileDto?.company?.mainCustomer,
          templateOptions: {
            label: this._translateService.instant('Main_Customer'),
            options: res[7].map(v => ({ label: v?.mainCustomerValue, value: v?.mainCustomerLookupId })),
          }
        },
      ]
      const getCountryCityUsingGETSub = this.LookupControllerService.getOriginCitiesUsingGET(this.ProfileDto?.user?.companyLocation?.originId).subscribe((res: any) => {
        this.fields.find(v => v?.key === 'city').templateOptions.options = res.map(v => ({ label: v?.cityName, value: v?.cityLookupId }))
        this.form.get('city')?.setValue(+this.ProfileDto?.userProfile?.address?.city)
      })
      this.unSubscription.push(getCountryCityUsingGETSub)
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
          if (element.includes('/profilePicture')) {
            this.profilePicture = element
          }
          else if (element.includes('/businessLicense')) {
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

    const sendEmptyAttachSub2 = this.UploadFileService.sendEmptyAttach.subscribe(res => {
      if (res) {
        this.profilePicture = undefined
        if (!this.profilePicture) this.updateProfile()

      }
    })
    this.unSubscription.push(sendEmptyAttachSub2)
  }


  updateProfile() {
    this.isSubmit = true
    if (this.userData?.role === roles?.customer) {
      let userProfileDto: UserProfileDto = {
        aboutMe: this.model?.aboutMe,
        address: {
          city: this.model?.city,
          // country:'',
          postalCode: this.model?.postalCode,
          street: this.model?.street,
        },
        "attachment": {
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": this.profilePicture
          },
          "reference": this.profilePicture
        },
        companyName: this.model?.companyName,
        customer: {
          businessLicense: {
            "attachmentSource": {
              "attachmentSourceId": 1,
              "attachmentSourceName": this.businessLicensePicture
            },
            "reference": this.businessLicensePicture
          },
          companyType: this.model?.companyType,
          establishmentDate: this.model?.establishmentDate ? new Date(this.model?.establishmentDate) : undefined,
          exportPercentage: this.model?.exportPercentage,
          mainCustomer: this.model?.mainCustomer,
          mainMarkets: this.model?.mainMarkets,
          numberOfEmployees: this.model?.numberEmployees,
          totalAnnualSalesVolume: this.model?.totalAnnualSales,
          website: this.model?.website,
        },
        fax: this.model?.fax,
        gender: this.model?.gender,
        interestedIn: this.model?.interestedIn,
        jobTitle: this.model?.jobTitle,
        landLine: this.model?.landLine?.number,
        phone: this.model?.phone?.number,
        skype: this.model?.skype,
        title: this.model?.title,
        userProfileId: this.ProfileDto?.userProfile?.userProfileId,
        workingIn: this.model?.workingIn,
      }

      const updateUserDetailsUsingPUTSub = this._userControllerService.updateUserDetailsUsingPUT(userProfileDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: UserResponseDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let UpdateSupplierProfileDto: UpdateSupplierProfileDto = {
        supplier: {
          businessLicense: this.businessLicensePicture ? {
            "attachmentSource": {
              "attachmentSourceId": 1,
              "attachmentSourceName": this.businessLicensePicture
            },
            "reference": this.businessLicensePicture
          } : undefined,
          companyType: this.model?.companyType,
          establishmentDate: this.model?.establishmentDate ? new Date(this.model?.establishmentDate) : undefined,
          exportPercentage: this.model?.exportPercentage,
          mainCustomer: this.model?.mainCustomer,
          mainMarkets: this.model?.mainMarkets,
          numberEmployees: this.model?.numberEmployees,
          totalAnnualSales: this.model?.totalAnnualSales,
          website: this.model?.website,
        },
        userProfile: {
          aboutMe: this.model?.aboutMe,
          address: {
            city: this.model?.city,
            postalCode: this.model?.postalCode,
            street: this.model?.street,
          },
          fax: this.model?.fax,
          gender: this.model?.gender,
          interestedIn: this.model?.interestedIn,
          landline: this.model?.landLine?.number,
          phone: this.model?.phone?.number,
          photo: {
            "attachmentSource": {
              "attachmentSourceId": 1,
              "attachmentSourceName": this.profilePicture
            },
            "reference": this.profilePicture
          },
          skype: this.model?.skype,
          title: this.model?.title,
          workingIn: this.model?.workingIn,

        }
      }
      const updateUserDetailsUsingPUTSub = this._supplierControllerService.updateSupplierProfileUsingPUT(UpdateSupplierProfileDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: SupplierEmployeeDto) => {
        if (res) {
          this.toaster.success(this._translateService.instant("updatedSuccessfully"))
        }

      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    }
  }

  onDeleteImage() {
    this.UploadFileService.deleteFile(this.profilePicture)


  }
  onSubmit() {
    window.localStorage.removeItem('addProfileStorage')
    this.beforeImagesLoaded = []

    if (this.model2?.UploadProfilePicture?.length) {

      this.beforeImagesLoaded?.push(this.model2?.UploadProfilePicture[0])

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `profiles/profile-${this.ProfileDto?.userProfile?.userProfileId}/profilePicture`)
    }
    if (this.model?.businessLicense?.length) {
      if (this.isFile(this.model?.businessLicense[0])) {
        this.beforeImagesLoaded?.push(this.model?.businessLicense[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.businessLicense[0]], `profiles/profile-${this.ProfileDto?.userProfile?.userProfileId}/businessLicense`)

    }

    if (!this.model?.businessLicense && !this.model2?.UploadProfilePicture?.length) {
      this.updateProfile()
    }



  }

  onChangePassword() {
    const initialState: ModalOptions = {
      class: 'modal-md',
    };
    this.modalService.show(ChangePasswordComponent, initialState);

  }

  onDeleteAccount() {
    const initialState: any = {
      class: 'modal-md',
    };
    const bsModalRef = this.modalService.show(DeleteAccountAlertComponent, initialState);
  }

  ngOnDestroy(): void {
    window.localStorage.removeItem('addProfileStorage')
  }
}
