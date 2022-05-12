import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'formly-field-chips',
  template: `

  <div class="form-group input-apis ">
  <label for="addressType"> {{to.label}}</label>
  <tag-input
    [formControl]="formControl"
    [formlyAttributes]="field"
    [editable]="true"
    [identifyBy]="'id'"
    [displayBy]="'name'">
  </tag-input>
  </div>

 `
})
export class FormlyFieldChips extends FieldType {


 }
