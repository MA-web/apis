import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'formly-upload-area',
  template: `
     <ul class="list-unstyled mt-3">
        <ng-container *ngFor="let item of to.items; let i = index">
        <li class="media align-items-center border-bottom py-2">
          <img class="mr-3 d" [src]="item?.file?.src">
          <div class="media-body ">
            <div class="d-flex justify-content-between align-items-center">
            <h5 class="mt-0 mb-1">
            <span class="d-inline-block mr-3">{{item?.CertificateName}},</span> <span class="d-inline-block">{{item?.file?.fileToUpload?.name}}</span> <span></span>
            </h5>

            <div class="d-flex flex-wrap gap-2">
              <button type="button" class="apis-button btn-outline-success border-radius-13" (click)="onView(item,i)">
              <span [inlineSVG]="'assets/icons/eye.svg'"></span>
            </button>
            <button type="button" class="apis-button btn-danger border-radius-13" (click)="onDelete(i)">
              <span [inlineSVG]="'assets/icons/delete.svg'"></span>
            </button>
            </div>
            </div>
          </div>
        </li>
        </ng-container>
     </ul>

  `,
  styles: [
    `
    img{
      width:45px;
      box-shadow: 0px 4px 8px #2C27380A;
    }

    h5{
      font-size:16px;
      font-weight:bold;
      color:#756F86;
    }

      :host ::ng-deep .btn-outline-success svg {
        zoom:1.3;
        path{
          fill: #27BEC6;

        }
    }
    `
  ]
})
export class FormlyUploadArea extends FieldArrayType {
   images: any = []
  constructor(
    private lightbox: Lightbox,
  ) {
    super()
  }

  onView(item: any, index: number) {

    this.images.push({ 'src': item?.file?.src, 'caption': item?.file?.fileToUpload?.name});
    this.lightbox.open( this.images, index, {
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
  }

  onDelete(index: number) {
    this.to.items?.splice(index, 1)
  }
}
