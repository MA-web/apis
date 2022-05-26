import { Component, HostListener, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { ItemControllerService, ItemDto, PagePublicItemDto, PublicDataControllerService, PublicItemDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { breadcrumb } from 'src/app/shared/models/breadcrumb.model';
import { appRouts } from 'src/environments/environment';

import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

export interface item extends PublicItemDto, ItemDto {

}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AppBaseComponent implements OnInit {

  productDetails: ItemDto
  id: any;

  similarProducts: Array<PublicItemDto> = []
  constructor(
    Injector: Injector,
    private _publicDataControllerService: PublicDataControllerService,
    private _itemControllerService: ItemControllerService
  ) {
    super(Injector)
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation?.extras?.state as { data: any };
      if (state) {
        this.productDetails = state?.data;
        this.getSimilarProducts()
        this.isLoading = false;
      } else {
        this.route.params.subscribe(param => {
          this.id = param['id']
          this.getDetails()
        })

      }


    }
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList },
      { label: this.productDetails?.itemName, active: true }
    ]

  }

  getDetails() {
    this.isLoading = true;
    const getItemByItemIdUsingGETSub = this._itemControllerService.getItemByItemIdUsingGET(this.id).subscribe((res: ItemDto) => {
      if (res) {

        this.productDetails = res;
        this.getSimilarProducts()
        this.breadcrumbItems = [
          { label: this._translateService.instant('Products'), path: appRouts.productsList },
          { label: this.productDetails?.itemName, active: true }
        ]
      }
    })
    this.unSubscription.push(getItemByItemIdUsingGETSub)
  }

  getSimilarProducts() {
    const getSimilarProductsUsingGETSub = this._publicDataControllerService.getSimilarProductsUsingGET(this.productDetails?.itemCategory?.categoryId, this.productDetails?.itemSubcategory?.itemSubcategoryId, this.pageNumber, this.pageSize).subscribe((res: PagePublicItemDto) => {
      if(res){
        this.isLoading = false;
        this.similarProducts = res.content
      }
    })
    this.unSubscription.push(getSimilarProductsUsingGETSub)

  }

  innerWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

  }

}
