import { Component, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-upload',
  template: `
  <div class="form-group">
          <label >{{to.label}}</label>
          <ngx-dropzone (change)="onSelect($event)" [accept]="'.png,.jpg,.jpeg'" [multiple]='to.multiple'  [formlyAttributes]="field"
            [disableClick]="files?.length?true:false">
            <ngx-dropzone-label>{{  (to.multiple? 'UploadFiles':'UploadFile') | translate}}</ngx-dropzone-label>
            <ng-container *ngFor="let f of files;let i = index">
              <ngx-dropzone-image-preview ngProjectAs="ngx-dropzone-preview" [file]="f" [removable]="true"
                (removed)="onRemove(f,i)">
                <ngx-dropzone-label>{{ f.name }}</ngx-dropzone-label>
              </ngx-dropzone-image-preview>
            </ng-container>
          </ngx-dropzone>
        </div>
 `,
  styles: [`
 ngx-dropzone-image-preview{
    margin: auto !important;

  }
  ngx-dropzone-image-preview img{
    opacity: 1!important;
    }
    img + ngx-dropzone-label{
      display:none!important;
    }
    ngx-dropzone-remove-badge{
      opacity: 1!important;
    }
 `],
  encapsulation: ViewEncapsulation.None,

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
