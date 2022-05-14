import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-imgs-preview',
  templateUrl: './imgs-preview.component.html',
  styleUrls: ['./imgs-preview.component.scss']
})
export class ImgsPreviewComponent  {
  images:any = [
    {'src':'https://via.placeholder.com/400','name':'Imag1'},
    {'src':'https://via.placeholder.com/400','name':'Imag2'}
  ]

  constructor(
    private lightbox: Lightbox,
  ) {
  }

  onView(item: any, index: number) {
      let images:any = []
      images.push({ 'src': item?.src, 'caption': item?.name});
    this.lightbox.open( images, index, {
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
  }


}
