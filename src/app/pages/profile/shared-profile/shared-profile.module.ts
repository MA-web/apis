import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgsPreviewComponent } from 'src/app/pages/profile/shared-profile/imgs-preview/imgs-preview.component';
import { LightboxModule } from 'ngx-lightbox';
import { InlineSVGModule } from 'ng-inline-svg-2';



@NgModule({
  declarations: [ImgsPreviewComponent],
  imports: [
    CommonModule,
    LightboxModule,
    InlineSVGModule
  ],
  exports:[
    ImgsPreviewComponent
  ]
})
export class SharedProfileModule { }
