import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-accordion',
  template: `

  <accordion class="formly-accordion" >
  <accordion-group  *ngFor="let accordion of field.fieldGroup; let i = index; let last = last;" [isOpen]="accordion.templateOptions.open">
    <div class="btn" accordion-heading>
    <div [ngClass]="{'changed-label': accordion.templateOptions?.className}">
      <span class="colored">{{accordion.templateOptions.label}}</span>
      <span class="text-danger" *ngIf="accordion.templateOptions.required">*</span>
      </div>
    </div>
  
    <formly-field [field]="accordion"></formly-field>
 
  </accordion-group>
</accordion>

`,

})
export class FormlyAccordion extends FieldType {}
