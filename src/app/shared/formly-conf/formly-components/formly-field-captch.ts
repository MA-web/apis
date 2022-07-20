import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-captcha',
  template: `
	<ngx-recaptcha2 #captchaElem siteKey="6LeFR6cUAAAAAGviLYm9xPsWGyVaTLjBCDFma9Yp" (success)="handleSuccess($event)" size="normal"
	 hl="en" theme="light" type="image" [formControl]="formControl" [formlyAttributes]="field">
	</ngx-recaptcha2>

 `
})
export class FormlyFieldCaptch extends FieldType {


  handleSuccess(data:any) {

  }
}
