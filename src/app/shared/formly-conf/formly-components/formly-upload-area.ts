import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';
import { Lightbox } from 'ngx-lightbox';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'formly-upload-area',
  template: `

     <ng-container *ngIf="to.single; else elseTemplate">
     <ul class="list-unstyled mt-3">

        <li class="media align-items-center border-bottom py-2">
          <img class="mr-3 d" [src]="to.fileLoad? items?.file:items?.file?.src">
          <div class="media-body ">
            <div class="d-flex justify-content-between align-items-center">
            <h5 class="mt-0 mb-1">
            <pre>

            </pre>
            <span class="d-inline-block mr-3">{{items?.Certificate?.certificateTypeName }},</span> <span class="d-inline-block">{{to.fileLoad? getImageName(items?.file):items?.file?.fileToUpload?.name}}</span> <span></span>
            </h5>

            <div class="button-items">
              <button type="button" class="apis-button btn btn-outline-success border-radius-13 py-2" (click)="onView(items,i)">
              <span [inlineSVG]="'assets/icons/eye.svg'"></span>
            </button>
              <button type="button" class="apis-button btn btn-danger border-radius-13 py-2" (click)="onDelete(i,items)" *ngIf="!to.fileLoad || !to.delete">
                <span [inlineSVG]="'assets/icons/delete.svg'"></span>
              </button>
            </div>
            </div>
          </div>
        </li>
     </ul>

     </ng-container>
     <ng-template #elseTemplate>
     <ul class="list-unstyled mt-3">
        <ng-container *ngFor="let item of to.items; let i = index">
        <li class="media align-items-center border-bottom py-2">
          <img class="mr-3 d" [src]="to.fileLoad? item?.file:item?.file?.src">
          <div class="media-body ">
            <div class="d-flex justify-content-between align-items-center">
            <h5 class="mt-0 mb-1">
            <span class="d-inline-block mr-3">{{item?.Certificate?.certificateTypeName || item?.Certificate?.Certificate}}  <span *ngIf="item?.otherCertificateName "> - {{item?.otherCertificateName }}</span> ,</span> <span class="d-inline-block">{{to.fileLoad? getImageName(item?.file):item?.file?.fileToUpload?.name || item?.file?.src?.replace('https://devspace-marksphinx.fra1.digitaloceanspaces.com/products/product-' + to?.productId +'/'+ to?.type +'/', '')}}</span> <span></span>
            </h5>
{{to?.type}}
            <div class="button-items">
              <button type="button" class="apis-button btn btn-outline-success border-radius-13 py-2" (click)="onView(item,i)">
              <span [inlineSVG]="'assets/icons/eye.svg'"></span>
            </button>
              <ng-container *ngIf="to.delete;">
              <button type="button" class="apis-button btn btn-danger border-radius-13 py-2" (click)="onDelete(i,item)" *ngIf="!to.fileLoad">
                <span [inlineSVG]="'assets/icons/delete.svg'"></span>
              </button>
              </ng-container>


            </div>
            </div>
          </div>
        </li>
        </ng-container>
     </ul>

     </ng-template>


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
export class FormlyUploadArea extends FieldArrayType {
   images: any = []
  constructor(
    private lightbox: Lightbox,
    private SharedService:SharedService
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

  onDelete(index: number,item?) {
    this.SharedService.removeIndexFromUploadArea.next({index:index,item:item})
    this.to.items?.splice(index, 1)
  }

  getImageName(img:string){
   let storeFileURI = img.split('/');
    return storeFileURI[storeFileURI.length-1]
  }
}
