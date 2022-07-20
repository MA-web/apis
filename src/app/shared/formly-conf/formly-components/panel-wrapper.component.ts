import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-panel',
  template: `
    <div class="input-wrap">
    <div class="form-group  m-0">
        <label for="">{{to.label}} <span class="ng-star-inserted" *ngIf="to.required">*</span></label>
     <ng-container #fieldComponent></ng-container>
    </div>
    </div>
  `,

  styles:[`

    :host ::ng-deep  .input-wrap formly-group{
        display:flex;
        align-items: start;
        formly-field:first-child{
          flex: 0 65%;
          .input-apis .form-control{
            border-radius:0;
            border-top-left-radius: 25px;
            border-bottom-left-radius: 25px;
          }
        }
        formly-field:last-child{
          flex: 0 35%;
          .ng-select .ng-select-container{
            border-radius:0;
            border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;

          }
          .invalid-feedback{
            display: none!important;
          }
        }
      }


  `]
})
export class PanelWrapperComponent extends FieldWrapper {
}
