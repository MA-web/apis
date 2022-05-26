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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormlyFieldUpload } from './formly-components/formly-filed-upload';
import { FormlyFieldText } from './formly-components/formly-text';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormlyAccordion } from './formly-components/formly-accordion';
import { TagInputModule } from 'ngx-chips';
import { FormlyFieldChips } from './formly-components/formly-filed-chips';
import { FormlyFieldFile } from './formly-components/formly-filed-file';
import { FormlyFieldButton } from './formly-components/button-type.component';
import { FormlyUploadArea } from './formly-components/formly-upload-area';
import { LightboxModule } from 'ngx-lightbox';
import { FormlyRepeatType } from './formly-components/formly-repeat-type';
import { PanelWrapperComponent } from './formly-components/panel-wrapper.component';
import { FileValueAccessor } from './formly-components/file-value-accessor';
import { ImagePreview } from './formly-components/image-preview.directive';
import { NumberInputDirective } from '../directive/number-input.directive';
import { FormlyFieldInputNumber } from './formly-components/formly-filed0input-number';


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
    FormlyFieldPhone,
    FormlyFieldUpload,
    FormlyFieldText,
    FormlyAccordion,
    FormlyFieldChips,
    FormlyFieldFile,
    FormlyFieldButton,
    FormlyUploadArea,
    FormlyRepeatType,
    PanelWrapperComponent,
    FileValueAccessor,
    ImagePreview,
    FormlyFieldInputNumber,
    NumberInputDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyBootstrapModule,
    FormlyModule.forChild({
      wrappers: [
        { name: 'panel', component: PanelWrapperComponent },
      ],
        types: [
          { name: 'input', component: FormlyFieldInput },
          { name: 'number', component: FormlyFieldInputNumber },
          { name: 'radio', component: FormlyFieldRadio },
          { name: 'captch', component: FormlyFieldCaptch },
          { name: 'ng-select', component: FormlyFieldSelect },
          { name: 'slider', component: FormlyFieldSlider },
          { name: 'phone', component: FormlyFieldPhone },
          { name: 'upload', component: FormlyFieldUpload },
          { name: 'text', component: FormlyFieldText },
          { name: 'accordion', component: FormlyAccordion },
          { name: 'chips', component: FormlyFieldChips },
          { name: 'file-upload', component: FormlyFieldFile, wrappers: ['form-field'] },
          { name: 'uploadArea', component: FormlyUploadArea },
          { name: 'repeat', component: FormlyRepeatType },
          {
            name: 'button',
            component: FormlyFieldButton,
            wrappers: ['form-field'],
            defaultOptions: {
              templateOptions: {
                btnType: 'default',
                type: 'button',
              },
            },
          },
        ]
    }),
    InlineSVGModule,
    NgxCaptchaModule,
    NgSelectModule,
    NgxSliderModule,
    NgxIntlTelInputModule,
    TranslateModule,
    NgxDropzoneModule,
    AccordionModule,
    TagInputModule,
    LightboxModule

  ],
  exports:[
    ReactiveFormsModule,
    FormlyModule,
    InlineSVGModule,
    NgxSliderModule,
    TagInputModule
  ],
  providers: [
    { provide: FORMLY_CONFIG, multi: true, useFactory: formlyValidationConfig, deps: [TranslateService] },
]
})
export class FormlyConfModule { }
