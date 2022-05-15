import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { FileSaverService } from 'ngx-filesaver';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  images:any = [];
  constructor(
    private lightbox: Lightbox,
    private _FileSaverService: FileSaverService,
    private SharedService:SharedService
    ) { }

  ngOnInit(): void {

    this.images.push({'src':'assets/img/certificate.svg','caption':'Imag1','thumb':'assets/img/certificate.svg'});
  }


  open(index: number): void {
    // open lightbox
    this.lightbox.open(this.images, index,{
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
  }

  onDownload() {
    this.SharedService.getBlob('assets/img/certificate.svg').subscribe(res =>{
      if(res){
        this._FileSaverService.save(res, 'dd');
      }
    })
  }

}
