import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'formly-image-view',
  template: `
     <ul class="list-unstyled mt-3">
        <ng-container *ngFor="let item of to.items; let i = index">
        <li class="media align-items-center border-bottom py-2">
          <img class="mr-3 d" [src]="to.fileLoad? item?.file:item?.file?.src">
          <div class="media-body ">
            <div class="d-flex justify-content-between align-items-center">
            <h5 class="mt-0 mb-1">
            <span class="d-inline-block mr-3">{{item?.CertificateName}},</span> <span class="d-inline-block">{{to.fileLoad? getImageName(item?.file):item?.file?.fileToUpload?.name}}</span> <span></span>
            </h5>

            <div class="button-items">
              <button type="button" class="apis-button btn btn-outline-success border-radius-13 py-2" (click)="onView(item,i)">
              <span [inlineSVG]="'assets/icons/eye.svg'"></span>
            </button>
              <button type="button" class="apis-button btn btn-danger border-radius-13 py-2" (click)="onDelete(i)" *ngIf="!to.fileLoad">
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


    `
  ]
})
export class FormlyImageView extends FieldArrayType {
   images: any = []
  constructor(
    private lightbox: Lightbox,
  ) {
    super()
  }

  onView(item: any, index: number) {

   if(this.to.fileLoad){
    this.images.push({ 'src': item?.file, 'caption': this.getImageName(item?.file)});
    this.lightbox.open( this.images, index, {
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
   }else{
    this.images.push({ 'src': item?.file?.src, 'caption': item?.file?.fileToUpload?.name});
    this.lightbox.open( this.images, index, {
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
   }
  }

  onDelete(index: number) {
    this.to.items?.splice(index, 1)
  }

  getImageName(img:string){
   let storeFileURI = img.split('/');
    return storeFileURI[storeFileURI.length-1]
  }
}