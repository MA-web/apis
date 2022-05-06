import { Options, LabelType } from "@angular-slider/ngx-slider";
import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
  .<div class="form-group">
    <label>{{to?.label}}</label>
    <ngx-slider [options]="to.sliderOptions" [formControl]="formControl" [formlyAttributes]="field"></ngx-slider>
  </div>
 `
})
export class FormlyFieldSlider extends FieldType {


 }
