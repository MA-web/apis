import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-text',
  template: `
    <p>
    {{to.text}}
    </p>
 `,

})
export class FormlyFieldText extends FieldType { }
