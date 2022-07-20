import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-input',
  template: `
  <p class="d-inline-block ml-2" style="font-size: 10px;letter-spacing: 0px;color: #BBBBBB;" *ngIf="to.labelHint">{{to.labelHint}}</p>
  <div class="position-relative input-apis" [ngClass]="{'with-icon':  to.icon}">
    <span><img [src]="'assets/icons/' + to.icon" *ngIf="to.icon"></span>
   <input   [type]="to.type" [formControl]="formControl" [formlyAttributes]="field" class="form-control" [ngClass]="{'border-red': formControl?.invalid && formControl?.touched}" [autocomplete]="to.autoComplete?'':'new-password'">
  </div>
 `,
  styles: [`
 span {
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
export class FormlyFieldInput extends FieldType { }
