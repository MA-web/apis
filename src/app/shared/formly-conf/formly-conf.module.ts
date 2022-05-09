import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldInput } from './formly-components/formly-field-input';
import { FormlyFieldRadio } from './formly-components/formly-field-radio';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormlyFieldCaptch } from './formly-components/formly-field-captch';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyFieldSelect } from './formly-components/formly-field-select';
import { FormlyFieldSlider } from './formly-components/formly-field-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormlyFieldPhone } from './formly-components/formly-filed-phone';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


export function formlyValidationConfig(translate: TranslateService) {
  return {
      validationMessages: [
          {
              name: 'required',
              message() {
                  return translate.stream('validations.required');
              },
          },
      ],
  };
}


@NgModule({
  declarations: [
    FormlyFieldInput,
    FormlyFieldRadio,
    FormlyFieldCaptch,
    FormlyFieldSelect,
    FormlyFieldSlider,
    FormlyFieldPhone
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild({
        types: [
          { name: 'input', component: FormlyFieldInput },
          { name: 'radio', component: FormlyFieldRadio },
          { name: 'captch', component: FormlyFieldCaptch },
          { name: 'select', component: FormlyFieldSelect },
          { name: 'slider', component: FormlyFieldSlider },
          { name: 'phone', component: FormlyFieldPhone },
        ]
    }),
    InlineSVGModule,
    NgxCaptchaModule,
    NgSelectModule,
    NgxSliderModule,
    NgxIntlTelInputModule,
    TranslateModule
  ],
  exports:[
    ReactiveFormsModule,
    FormlyModule,
    InlineSVGModule,
    NgxSliderModule
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: formlyValidationConfig, deps: [TranslateService] },
]
})
export class FormlyConfModule { }
