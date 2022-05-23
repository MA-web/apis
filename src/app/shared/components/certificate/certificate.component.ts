import { Component, Input, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { FileSaverService } from 'ngx-filesaver';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ItemCertificateDto } from 'src/app/@api';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {

  @Input() certificate:ItemCertificateDto = {}
  constructor(
    private lightbox: Lightbox,
    private _FileSaverService: FileSaverService,
    private SharedService:SharedService
    ) { }

  ngOnInit(): void { }


  open(index: number): void {
    // open lightbox
    let imgs :any= [
      {'src':this.certificate?.attachment?.attachmentSource?.attachmentSourceName,'caption':this.certificate?.itemCertificateName}
    ]
    this.lightbox.open(imgs, index,{
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
