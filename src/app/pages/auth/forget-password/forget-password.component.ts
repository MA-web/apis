import { Component,  OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends AppBaseComponent implements OnInit {

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          placeholder: this._translateService.instant('emailPlaceHolder'),
          icon: 'mail.svg',
          required: true,
          autoComplete:true
        }
      },
    ]
  }


  onSubmit() {
    console.log(this.form)
    console.log(this.model);
  }
}
