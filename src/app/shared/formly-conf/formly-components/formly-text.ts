import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-text',
  template: `
    <p>
    {{to.text}}
    </p>
 `,
 styles:[`
  p{
    color:#bbb;
    font-size:19px;
    font-weight:bold
  }
 `]

})
export class FormlyFieldText extends FieldType { }
