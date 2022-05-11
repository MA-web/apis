import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { breadcrumb } from 'src/app/shared/models/breadcrumb.model';
import { appRouts } from 'src/environments/environment';

import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailsComponent extends AppBaseComponent implements OnInit {


  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList },
      { label: 'Natural Extracts', active: true }
    ]

  }
  innerWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

  }

}
