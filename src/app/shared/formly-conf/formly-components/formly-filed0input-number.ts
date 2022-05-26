import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input-number',
  template: `
  <div class="form-group">
  <label *ngIf="to.label">{{to.label}} <span class="ng-star-inserted" *ngIf="to.required">*</span></label>
    <p class="d-inline-block ml-2" style="font-size: 10px;letter-spacing: 0px;color: #BBBBBB;" *ngIf="to.labelHint">{{to.labelHint}}</p>
    <div class="position-relative input-apis" [ngClass]="{'with-icon':  to.icon}">
      <span><img [src]="'assets/icons/' + to.icon" *ngIf="to.icon"></span>
      <ng-container *ngIf="to.min ||to.max; else elseTemplate">
      <input   type="text" appNumberInput  [min]="to.min" [max]="to.max" [formControl]="formControl" [formlyAttributes]="field" class="form-control" [ngClass]="{'border-red': formControl?.invalid && formControl?.touched}" [autocomplete]="to.autoComplete?'':'new-password'">

    </ng-container>
    <ng-template #elseTemplate>
    <input   type="text" appNumberInput [min]="0" [formControl]="formControl" [formlyAttributes]="field" class="form-control" [ngClass]="{'border-red': formControl?.invalid && formControl?.touched}" [autocomplete]="to.autoComplete?'':'new-password'">

    </ng-template>

    </div>
  </div>

 `,
  styles: [`
 .icon {
    position: absolute;
    left:8px;
    z-index: 2;
    display: block;
    width: 3rem;
    height: 2.7em;
    line-height: 2.7em;
    text-align: center;
    pointer-events: none;
}
 `]
})
export class FormlyFieldInputNumber extends FieldType { }
