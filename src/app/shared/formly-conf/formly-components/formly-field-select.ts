import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-select',
  template: `

  <div class="form-group">
    <label *ngIf="to.label">{{to.label}} <span class="ng-star-inserted" *ngIf="to.required">*</span></label>
    <div class="select-apis select-apis-1 position-relative" [ngClass]="{'with-icon':  to.icon}">
    <span><img [src]="'assets/icons/' + to.icon" *ngIf="to.icon"></span>
      <ng-select  [formControl]="formControl" [formlyAttributes]="field" [multiple]="to?.multiple" [placeholder]="to.placeholder" [ngClass]="{'border-red': formControl?.invalid && formControl?.touched}">
      <ng-option *ngFor="let option of to.options" [value]="option.value">{{option.label}}</ng-option>
    </ng-select>
    </div>
  </div>
`,
  styles: [`
 /* span {
    position: absolute;
    left:8px;
    z-index: 1002;
    display: block;
    width: 3rem;
    height: 2.7em;
    line-height: 2.7em;
    text-align: center;
    pointer-events: none;
} */
 `]
})
export class FormlyFieldSelect extends FieldType { }
