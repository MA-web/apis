import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { OriginDto, RegisterControllerService, SupplierEmployeeDto, SupplierEmployeeResponseDto, UserRequestDto, UserResponseDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends AppBaseComponent implements OnInit, OnDestroy {

  constructor(
    injector: Injector,
    private RegisterControllerService: RegisterControllerService
  ) {
    super(injector);
    this.isLoading = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    const getOriginsUsingGETSub = this.LookupControllerService.getOriginsUsingGET().subscribe(((res_origin: Array<OriginDto>) => {
      this.fields = [
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
          key: 'accountType',
          type: 'radio',
          templateOptions: {
            type: 'radio',
            label: this._translateService.instant('accountType'),
            required: true,
            name: 'accountType',
            options: [{ value: 'User', key: 'user', icon: 'user.svg' }, { value: 'Supplier', key: 'supplier', icon: 'supplier.svg' }]
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
            required: true
          }
        },
        {
          className: 'col-12',
          key: 'origin',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('companyLocation'),
            options: res_origin?.map(v => ({ label: v.originName, value: v.originId })),
            icon: 'i3.svg',
            required: true
          }
        },
        {
          className: 'col-12',
          key: 'jobTitle',
          type: 'input',
          templateOptions: {
            label: this._translateService.instant('jobTitle'),
            icon: 'i4.svg',
            required: true
          }
        },
        {
          className: 'col-12',
          key: 'password',
          type: 'input',
          templateOptions: {
            type: 'password',
            label: this._translateService.instant('password'),
            icon: 'password.svg',
            required: true,
            pattern: generalValidations.password
          },
          validation: {
            messages: {
              pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.password')}`,
            },
          },
        },
        {
          className: 'col-12',
          key: 'rePassword',
          type: 'input',
          templateOptions: {
            type: 'password',
            icon: 'password.svg',
            label: `${this._translateService.instant('rePassword')}`,
          },
          validators: {
            fieldMatch: {
              expression: (control: any) => control.value === this.model.password,
              message: this._translateService.instant('validations.PasswordNotMatching'),
            },
          },
          expressionProperties: {
            'templateOptions.disabled': () => !this.form.get('password').valid,
          }
        },
        {
          className: 'col-12',
          key: 'rcaptch',
          type: 'captch',
          templateOptions: {
            // required: true
          }
        },
      ]
    }))
    this.unSubscription.push(getOriginsUsingGETSub)

    setTimeout(() => {
      this.isLoading = false
    }, 1000);

  }


  onSubmit() {
    this.isSubmit = true;
    if (this.model?.accountType === "user") {
      let UserRequestDto: UserRequestDto = {
        companyName: this.model?.companyName,
        email: this.model?.email,
        firstName: this.model?.firstName,
        jobTitle: this.model?.jobTitle,
        lastName: this.model?.lastName,
        origin: {
          originId: this.model?.origin
        },
        password: this.model?.password,
        userProfile: {},
        username: this.model?.email,
      }

      const addCustomerUsingPOSTSub = this.RegisterControllerService.addCustomerUsingPOST(UserRequestDto).pipe(
        finalize(() => {
          this.isSubmit = false;
        })
      ).subscribe((res: UserResponseDto) => {
        window.localStorage.setItem('emailToAPIs', this.model?.email)
        this._sharedService.sendEmail.next(this.model?.email);
        if (res) this.router.navigate(['/auth/confirm-signup'])
      })
      this.unSubscription.push(addCustomerUsingPOSTSub)
    } else {
      let supplierEmployeeDto: SupplierEmployeeDto = {
        "supplier": {
          "supplierEmail":  this.model?.email,
          "supplierName": `${this.model?.firstName} ${this.model?.lastName}`
        },
        "user": {
          companyName: this.model?.companyName,
          email: this.model?.email,
          firstName: this.model?.firstName,
          jobTitle: this.model?.jobTitle,
          lastName: this.model?.lastName,
          origin: {
            originId: this.model?.origin
          },
          password: this.model?.password,
          userProfile: {},
          username: this.model?.email,
        }


      }

      const addCustomerUsingPOSTSub = this.RegisterControllerService.addSupplierUsingPOST(supplierEmployeeDto).pipe(
        finalize(() => {
          this.isSubmit = false;
        })
      ).subscribe((res: SupplierEmployeeResponseDto) => {
        window.localStorage.setItem('emailToAPIs', this.model?.email)
        this._sharedService.sendEmail.next(this.model?.email);
        if (res) this.router.navigate(['/auth/confirm-signup'])
      })
      this.unSubscription.push(addCustomerUsingPOSTSub)
    }
  }
}
