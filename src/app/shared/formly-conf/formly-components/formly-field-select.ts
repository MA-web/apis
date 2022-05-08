import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `

<div class="select-apis select-apis-1 position-relative" [ngClass]="{'with-icon':  to.icon}">
<span><img [src]="'assets/icons/' + to.icon" *ngIf="to.icon"></span>
  <ng-select [formControl]="formControl" [formlyAttributes]="field" [multiple]="to?.multiple">
   <ng-option *ngFor="let option of to.options" [value]="option.value">{{option.label}}</ng-option>
</ng-select>
</div>
`,
  styles: [`
 span {
    position: absolute;
    left:8px;
    z-index: 1002;
    display: block;
    width: 3rem;
    height: 2.7em;
    line-height: 2.7em;
    text-align: center;
    pointer-events: none;
}
 `]
})
export class FormlyFieldSelect extends FieldType { }
