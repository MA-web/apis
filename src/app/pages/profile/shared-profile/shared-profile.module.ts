import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgsPreviewComponent } from 'src/app/pages/profile/shared-profile/imgs-preview/imgs-preview.component';
import { LightboxModule } from 'ngx-lightbox';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { MessageCardComponent } from './message-card/message-card.component';



@NgModule({
  declarations: [ImgsPreviewComponent, MessageCardComponent],
  imports: [
    CommonModule,
    LightboxModule,
    InlineSVGModule
  ],
  exports:[
    ImgsPreviewComponent,
    MessageCardComponent
  ]
})
export class SharedProfileModule { }
