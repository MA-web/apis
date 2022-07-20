import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-button',
  template: `
    <div>
      <button [type]="to.type" [ngClass]="'btn apis-button border-radius-13 btn-' + to.btnType" (click)="onClick($event)"  [disabled]="to.disabled">
      <span *ngIf="to.icon" [inlineSVG]="'./assets/icons/' + to.icon" forceEvalStyles="true"></span>
        {{ to.text }}
      </button>
    </div>
  `,

  styles:[`
  :host ::ng-deep svg {
    zoom:1.3;
    path:last-child{
      fill: #fff;
    }
  }
  `]
})
export class FormlyFieldButton extends FieldType {
  onClick($event:any) {
    if (this.to.onClick) {
      this.to.onClick($event);
    }
  }
}
