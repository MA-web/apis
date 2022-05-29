import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as e from 'express';
import { finalize } from 'rxjs';
import { OriginDto, SupplierControllerService, SupplierEmployeeDto, UpdateSupplierProfileDto, UserControllerService, UserProfileDto, UserResponseDto } from 'src/app/@api';
import { ProfileDto } from 'src/app/@api/model/profileDto';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations, roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends AppBaseComponent implements OnInit, OnDestroy {
  ProfileDto: ProfileDto = {}

  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  beforeImagesLoaded = []
  businessLicensePicture:string;
  profilePicture:string;
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
    private _supplierControllerService: SupplierControllerService
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
    const getOriginsUsingGETSub = this.LookupControllerService.getOriginsUsingGET().subscribe(((res_origin: Array<OriginDto>) => {

      const getUserProfileUsingGET = observableGetProfile.subscribe((res: ProfileDto) => {

        this.ProfileDto = res;
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
            defaultValue: res?.user?.firstName,
            templateOptions: {
              label: this._translateService.instant('firstName'),
              readonly: true
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'lastName',
            type: 'input',
            defaultValue: res?.user?.lastName,
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
              options: [{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]
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
            defaultValue: res?.user?.companyName,
            templateOptions: {
              label: this._translateService.instant('Company'),
              readonly: true
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'establishmentDate',
            type: 'input',
            defaultValue: res?.company?.establishmentDate,
            templateOptions: {
              type: 'date',
              label: this._translateService.instant('EstablishmentDate')
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'origin',
            type: 'ng-select',
            defaultValue: res?.user?.companyLocation?.originId,
            templateOptions: {
              label: this._translateService.instant('companyLocation'),
              options: res_origin?.map(v => ({ label: v.originName, value: v.originId })),
              disabled: true

            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'city',
            type: 'ng-select',
            defaultValue: res?.userProfile?.address?.city,
            templateOptions: {
              multiple: true,
              label: this._translateService.instant('city'),
              options: [],

            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'street',
            type: 'input',
            defaultValue: res?.userProfile?.address?.street,
            templateOptions: {
              label: this._translateService.instant('Street'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'postalCode',
            type: 'input',
            defaultValue: res?.userProfile?.address?.postalCode,
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
            defaultValue: res?.company?.website,
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
            type: 'number',
            defaultValue: res?.company?.numberEmployees,
            templateOptions: {
              label: this._translateService.instant('numEmployees'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'title',
            type: 'input',
            defaultValue: res?.userProfile?.title,
            templateOptions: {
              label: this._translateService.instant('Title'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'companyType',
            type: 'input',
            defaultValue: res?.company?.companyType,
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
              file: res?.company?.businessLicense?.reference,
            }
          },

          {
            className: 'col-12',
            key: 'aboutMe',
            type: 'input',
            defaultValue: res?.userProfile?.aboutMe,
            templateOptions: {
              label: this._translateService.instant('AboutMe'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'workingIn',
            type: 'input',
            defaultValue: res?.userProfile?.workingIn,
            templateOptions: {
              label: this._translateService.instant('WorkingIn'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'interestedIn',
            // type: 'ng-select',
            type: 'input',
            defaultValue: res?.userProfile?.interestedIn,
            templateOptions: {
              label: this._translateService.instant('interestedIn'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'totalAnnualSales',
            // type: 'ng-select',
            type: 'number',
            defaultValue: res?.company?.totalAnnualSales,
            templateOptions: {
              label: this._translateService.instant('Total_annual_sales_volume'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'exportPercentage',
            // type: 'ng-select',
            type: 'number',
            defaultValue: res?.company?.exportPercentage,
            templateOptions: {
              label: this._translateService.instant('Export_Percentage'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'mainMarkets',
            type: 'ng-select',
            // type:'input',
            defaultValue: res?.company?.mainMarkets,
            templateOptions: {
              label: this._translateService.instant('Main_Markets'),
              options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'mainCustomer',
            type: 'ng-select',
            defaultValue: res?.company?.mainCustomer,
            templateOptions: {
              label: this._translateService.instant('Main_Customer'),
              options: []
            }
          },
        ]

        this.isLoading = false





      })
      this.unSubscription.push(getUserProfileUsingGET)
    }))


    this.unSubscription.push(getOriginsUsingGETSub)

    this.UploadFileService.resData.subscribe(res => {
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

    this._sharedService.sendEmptyAttach.subscribe(res =>{
      if(res)  this.businessLicensePicture = undefined
    })
  }


  updateProfile(){
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
              "attachmentSourceName":  this.businessLicensePicture
            },
            "reference":  this.businessLicensePicture
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

      const updateUserDetailsUsingPUTSub = this._userControllerService.updateUserDetailsUsingPUT(userProfileDto).pipe(finalize(()=>{
        this.isSubmit = false
      })).subscribe((res: UserResponseDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")
        }
      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    } else {
      let UpdateSupplierProfileDto:UpdateSupplierProfileDto = {
        supplier:{
          businessLicense: {
            "attachmentSource": {
              "attachmentSourceId": 1,
              "attachmentSourceName": this.businessLicensePicture
            },
            "reference":  this.businessLicensePicture
          },
          companyType:this.model?.companyType,
          establishmentDate: this.model?.establishmentDate ? new Date(this.model?.establishmentDate) : undefined,
          exportPercentage:this.model?.exportPercentage,
          mainCustomer:this.model?.mainCustomer,
          mainMarkets:this.model?.mainMarkets,
          numberEmployees: this.model?.numberEmployees,
          totalAnnualSales:this.model?.totalAnnualSales,
          website:this.model?.website,
        },
        userProfile:{
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
          photo:{
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
      const updateUserDetailsUsingPUTSub = this._supplierControllerService.updateSupplierProfileUsingPUT(UpdateSupplierProfileDto).pipe(finalize(()=>{
        this.isSubmit = false
      })).subscribe((res: SupplierEmployeeDto) => {
        if (res) {
          this.toaster.success("updatedSuccessfully")

        }

      })
      this.unSubscription.push(updateUserDetailsUsingPUTSub)
    }
  }


  onSubmit() {
    console.log(this.model2?.UploadProfilePicture);

    window.localStorage.removeItem('addProfileStorage')
    this.beforeImagesLoaded = []

    if (this.model2?.UploadProfilePicture?.length) {

      this.beforeImagesLoaded?.push(this.model2?.UploadProfilePicture[0])

      this.UploadFileService.uploadMultiple([this.model2?.UploadProfilePicture[0]], `profiles/profile-${this.ProfileDto?.userProfile?.userProfileId}/profilePicture`)
    }
    if (this.model?.businessLicense?.length) {
      if(this.isFile(this.model?.businessLicense[0])){
        this.beforeImagesLoaded?.push(this.model?.businessLicense[0])
      }

      this.UploadFileService.uploadMultiple([this.model?.businessLicense[0]], `profiles/profile-${this.ProfileDto?.userProfile?.userProfileId}/businessLicense`)

    }

    if(!this.model?.businessLicense && !this.model2?.UploadProfilePicture?.length){
      this.updateProfile()
    }



  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.localStorage.removeItem('addProfileStorage')
  }
}
