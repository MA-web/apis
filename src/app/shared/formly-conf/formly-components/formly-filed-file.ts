import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-file',
  template: `
  <div class="file-input">
      <input
        type="file"
        [id]="field.key"
        class="file-input__input"
        [formControl]="formControl" [formlyAttributes]="field"
        [multiple]="to.multiple"
      />
      <label class="file-input__label apis-button btn-outline-info " [for]="field.key">
        <span [inlineSVG]="to.icon?to.icon:'./assets/icons/download.svg'" forceEvalStyles="true"></span>
        <span>{{to.text}}</span></label
      >
    </div>
 `,
  styles: [`
.file-input__input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.file-input__label {
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  text-transform:capitalize;
  width: 100%;
  text-align: center;
}

:host ::ng-deep svg {
  height: 16px;
  margin-right: 4px;
  zoom:1.3;
  path{
    fill: #24B6F7;
  }
}
 `]
})
export class FormlyFieldFile extends FieldType {


}
