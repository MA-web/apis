import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-upload',
  template: `
  <div class="form-group">
          <label >{{to.label}}</label>
          <ngx-dropzone (change)="onSelect($event)" [accept]="'.png,.jpg,.jpeg'" [multiple]='to.multiple'  [formlyAttributes]="field"
            [disableClick]="files?.length?true:false">
            <ngx-dropzone-label>{{ 'UploadFiles' | translate}}</ngx-dropzone-label>
            <ng-container *ngFor="let f of files;let i = index">
              <ngx-dropzone-image-preview ngProjectAs="ngx-dropzone-preview" [file]="f" [removable]="true"
                (removed)="onRemove(f,i)">
                <ngx-dropzone-label>{{ f.name }}</ngx-dropzone-label>
              </ngx-dropzone-image-preview>
            </ng-container>
          </ngx-dropzone>
        </div>
 `,
})
export class FormlyFieldUpload extends FieldType {

  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);

    this.formControl.setValue(this.files)
  }

  onRemove(event: any, i: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
