import { Component,  OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent extends AppBaseComponent implements OnInit {

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
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
    ]
  }


  onSubmit() {
    console.log(this.form)
    console.log(this.model);
  }
}
