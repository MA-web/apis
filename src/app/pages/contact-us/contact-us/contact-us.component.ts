import { Component, Injector, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { PublicDataControllerService } from 'src/app/@api';
import { ContactUsDto } from 'src/app/@api/model/contactUsDto';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts, generalValidations } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent extends AppBaseComponent implements OnInit {

  constructor(
    injector: Injector,
    private PublicDataControllerService: PublicDataControllerService
  ) {
    super(injector)
    this.isLoading = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('contact-us'), path: appRouts.events, active: true }
    ]

    this.fields = [
      {
        fieldGroupClassName: 'row',
        className: 'col-md-6',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'firstName',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('firstName'),
              icon: 'i1.svg',
              required: true
            }
          },
          {
            className: 'col-6',
            key: 'lastName',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('lastName'),
              icon: 'i1.svg',
              required: true
            }
          },
          {
            className: 'col-12',
            key: 'email',
            type: 'input',
            templateOptions: {
              type: 'email',
              label: this._translateService.instant('email'),
              placeholder: this._translateService.instant('emailPlaceHolder'),
              icon: 'mail.svg',
              required: true,
              pattern: generalValidations.email
            },
            validation: {
              messages: {
                pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.email')}`,
              },
            },
          },
          {
            className: 'col-12',
            key: 'companyName',
            type: 'input',
            templateOptions: {
              label: this._translateService.instant('companyName'),
              icon: 'i2.svg',
            }
          },
          {
            className: 'col-12',
            key: 'phone',
            type: 'phone',
            templateOptions: {
              label: this._translateService.instant('phone'),
            }
          }]
      },

      {
        fieldGroupClassName: 'row',
        className: 'col-md-6',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'message',
            type: 'textarea',
            templateOptions: {
              label: this._translateService.instant('message'),
              required: true,
              rows: 13,
            }
          }]
      },

    ];

    setTimeout(() => {
      this.isLoading = false
    }, 1000);
  }

  onSubmit() {
    this.isSubmit = true;
    let contactUsDto: ContactUsDto = {
      companyName: this.model?.companyName,
      email: this.model?.email,
      firstName: this.model?.firstName,
      lastName: this.model?.lastName,
      message: this.model?.message,
      phone: this.model?.phone['e164Number']
    }
    const addCustomerUsingPOSTSub = this.PublicDataControllerService.postContactUs(contactUsDto).pipe(
      finalize(() => {
        this.isSubmit = false;
      })
    ).subscribe((res: any) => {
      this.toaster.success(this._translateService.instant('SuccessfullyDone'))
    })
    this.unSubscription.push(addCustomerUsingPOSTSub)
  }

}
