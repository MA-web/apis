import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends AppBaseComponent implements OnInit {




  constructor(
    injector: Injector,
   ) {
    super(injector)
  }

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className:'col-6',
        key: 'firstName',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('firstName'),
          icon: 'i1.svg',
          required: true
        }
      },
      {
        className:'col-6',
        key: 'lastName',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('lastName'),
          icon: 'i1.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'accountType',
        type: 'radio',
        templateOptions: {
          type: 'radio',
          label: this._translateService.instant('accountType'),
          required: true,
          name: 'accountType',
          options: [{ value: 'User', key: 'User',icon:'user.svg' }, { value: 'Supplier', key: 'Supplier',icon:'supplier.svg' }]
        }
      },
      {
        className:'col-12',
        key: 'email',
        type: 'input',
        templateOptions: {
          type:'email',
          label: this._translateService.instant('email'),
          placeholder: this._translateService.instant('emailPlaceHolder'),
          icon: 'mail.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'companyName',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('companyName'),
          icon: 'i2.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'companyLocation',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('companyLocation'),
          options:[],
          icon: 'i3.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'jobTitle',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('jobTitle'),
          icon: 'i4.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('password'),
          icon: 'password.svg',
          required: true
        }
      },
      {
        className:'col-12',
        key: 'rePassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          icon: 'password.svg',
          label: `${this._translateService.instant('rePassword')}`,
        },
        validators: {
          fieldMatch: {
            expression: (control:any) => control.value === this.model.password,
            message: this._translateService.instant('validations.PasswordNotMatching'),
          },
        },
        expressionProperties: {
          'templateOptions.disabled': () => !this.form.get('password')?.valid,
        }
      },
      {
        className:'col-12',
        key: 'rcaptch',
        type: 'captch',
        templateOptions: {
          required: true
        }
      },
    ]



  }


  onSubmit() {
    console.log(this.form)
    console.log(this.model);
  }
}
