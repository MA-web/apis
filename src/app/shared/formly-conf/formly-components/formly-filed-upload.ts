import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType, FormlyFormBuilder } from '@ngx-formly/core';
import { UploadFileService } from '../../services/file-upload.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'formly-field-upload',
  template: `
  <div class="form-group">
          <label *ngIf="to?.label" >{{to?.label}}</label>
          <ngx-dropzone (change)="onSelect($event)" [accept]="to.accept?to.accept:'.png,.jpg,.jpeg'" [multiple]='to.multiple'  [formlyAttributes]="field"
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
export class FormlyFieldUpload extends FieldType implements OnInit {
  constructor(private _sharedService: SharedService, private UploadFileService: UploadFileService) {
    super();
  }
  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    this.formControl.setValue(this.files)
  }

  onRemove(event: any, i: any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.UploadFileService.deleteFile(this.to?.file.replace('https://devspace-marksphinx.fra1.digitaloceanspaces.com/', ''))
    this._sharedService.sendEmptyAttach.next(true)
  }

  async ngOnInit() {
    this._sharedService.dropzoneEmptySubj.subscribe(res => {
      if (res) this.files = []
    })

    if (this.to?.file) {

      let response = await fetch(this.to?.file);
      let data = await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      let file = new File([data], "test.jpg", metadata);
      this.files.push(file)

    }
  }

}
