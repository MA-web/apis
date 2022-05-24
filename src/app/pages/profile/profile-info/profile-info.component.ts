import { Component, Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { OriginDto, UserControllerService, UserProfileDto, UserResponseDto } from 'src/app/@api';
import { ProfileDto } from 'src/app/@api/model/profileDto';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends AppBaseComponent implements OnInit {
  ProfileDto: ProfileDto = {}
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
  ) {
    super(injector)
    this.isLoadingForm = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    const getOriginsUsingGETSub = this.LookupControllerService.getOriginsUsingGET().subscribe(((res_origin: Array<OriginDto>) => {
      const getUserProfileUsingGET = this._userControllerService.getUserProfileUsingGET().subscribe((res: ProfileDto) => {
        this.ProfileDto = res;
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
            templateOptions: {
              label: this._translateService.instant('gender'),
              options: [{ label: 'Male', value: 0 }, { label: 'Female', value: 1 }]
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'phone',
            type: 'phone',
            templateOptions: {
              label: this._translateService.instant('telephone'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'landLine',
            type: 'phone',
            templateOptions: {
              label: this._translateService.instant('Landline')
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'fax',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('Fax')
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'skype',
            type: 'input',
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
            templateOptions: {
              label: this._translateService.instant('Street'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'postalCode',
            type: 'input',
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
            type: 'input',
            templateOptions: {
              type: 'number',
              label: this._translateService.instant('numEmployees'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'title',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('Title'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'companyType',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('Type'),
            }
          },
          {
            className: 'col-12',
            key: 'businessLicense',
            type: 'upload',
            templateOptions: {
              label: this._translateService.instant('BusinessLicensee'),
            }
          },
          {
            className: 'col-12',
            key: 'aboutMe',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('AboutMe'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'workingIn',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('WorkingIn'),
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'interestedIn',
            // type: 'ng-select',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('interestedIn'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'totalAnnualSales',
            // type: 'ng-select',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: this._translateService.instant('Total_annual_sales_volume'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'exportPercentage',
            // type: 'ng-select',
            type: 'input',
            templateOptions: {
              type: 'number',
              label: this._translateService.instant('Export_Percentage'),
              // options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'mainMarkets',
            type: 'ng-select',
            // type:'input',
            templateOptions: {
              label: this._translateService.instant('Main_Markets'),
              options: []
            }
          },
          {
            className: 'col-sm-6 col-12',
            key: 'mainCustomer',
            type: 'ng-select',
            templateOptions: {
              label: this._translateService.instant('Main_Customer'),
              options: []
            }
          },
        ]
      })
      this.unSubscription.push(getUserProfileUsingGET)
    }))


    this.unSubscription.push(getOriginsUsingGETSub)



  }




  onSubmit() {
    console.log(this.model);
    let userProfileDto: UserProfileDto = {
      aboutMe: this.model?.aboutMe,
      address: {
        city: this.model?.city,
        // country?: string;
        postalCode: this.model?.postalCode,
        street: this.model?.street,
      },
      "attachment": {
        "attachmentSource": {
          "attachmentSourceId": 1,
          "attachmentSourceName": "https://via.placeholder.com/218x218"
        },
        "reference": "string"
      },
      companyName: this.model?.companyName,
      customer: {
         businessLicense:{
          "attachmentSource": {
            "attachmentSourceId": 1,
            "attachmentSourceName": "https://via.placeholder.com/218x218"
          },
          "reference": "string"
        },
        companyType: this.model?.companyType,
        establishmentDate: this.model?.establishmentDate,
        exportPercentage: this.model?.exportPercentage,
        mainCustomer: this.model?.mainCustomer,
        mainMarkets: this.model?.mainMarkets,
        numberOfEmployees: this.model?.numberOfEmployees,
        // totalAnnualSalesVolume?: string;
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
      userProfileId: this.userData?.id,
      workingIn: this.model?.workingIn,
    }
    const updateUserDetailsUsingPUTSub = this._userControllerService.updateUserDetailsUsingPUT(userProfileDto).subscribe((res: UserResponseDto) => {
      this.options.resetModel()
      this.toaster.success("updatedSuccessfully")

    })
    this.unSubscription.push(updateUserDetailsUsingPUTSub)
  }

}
