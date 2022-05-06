import { Component,  OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AppBaseComponent implements OnInit {

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: this._translateService.instant('email'),
          placeholder: this._translateService.instant('emailPlaceHolder'),
          icon: 'mail.svg',
          required: true,
          autoComplete:true
        }
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('password'),
          icon: 'password.svg',
          required: true,
          autoComplete:true
        }
      }
    ]
  }


  onSubmit() {
    console.log(this.form)
    console.log(this.model);
  }
}
