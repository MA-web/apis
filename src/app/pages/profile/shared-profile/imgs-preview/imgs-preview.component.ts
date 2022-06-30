import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-imgs-preview',
  templateUrl: './imgs-preview.component.html',
  styleUrls: ['./imgs-preview.component.scss']
})
export class ImgsPreviewComponent implements OnInit {
  @Input()images = []



  constructor(
    private lightbox: Lightbox,
  ) {
  }
  ngOnInit(): void {
    if(this.images?.length > 0){

      this.images=  this.images.map(v => (
        {'src': v?.attachment?.reference,'name': v?.itemCertificateName}
      ))
    console.log(this.images);
    }
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
