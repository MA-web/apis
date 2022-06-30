import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ItemCertificateDto, ItemControllerService, ItemDto, PageItemDto, PagePublicItemDto, PublicDataControllerService, PublicItemDto, UserControllerService } from 'src/app/@api';
import { SupplierEmployeeControllerService } from 'src/app/@api/api/supplierEmployeeController.service';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { SendInboxComponent } from 'src/app/shared/components/send-inbox/send-inbox.component';
import { appRouts, roles } from 'src/environments/environment';

import SwiperCore, { Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent extends AppBaseComponent implements OnInit, OnDestroy {
  Certificates: Array<ItemCertificateDto> = []
  productDetails: any
  id: any;

  similarProducts: Array<any> = []
  constructor(
    Injector: Injector,
    private _publicDataControllerService: PublicDataControllerService,
    private _itemControllerService: ItemControllerService,
    private _userControllerService: UserControllerService,
    private _supplierEmployeeControllerService: SupplierEmployeeControllerService,
    private modalService: BsModalService
  ) {
    super(Injector)
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation?.extras?.state as { data: any };
      if (state) {
        this.productDetails = state?.data;
        if(this.productDetails?.itemCertificateDtos?.length>0 || this.productDetails?.shippingCertificateDtos?.length>0 ){
          this.Certificates = [...this.productDetails?.itemCertificateDtos, ...this.productDetails?.shippingCertificateDtos]
        }
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
    let observable;
    if (!this._sharedService.checkToken()) {
      const getPublishedItemByItemIdUsingSub =  this._publicDataControllerService.getPublishedItemByItemIdUsingGET1(this.id).subscribe((res: PublicItemDto) => {
        if (res) {
          this.productDetails = res;
          this.getSimilarProducts()
          this.breadcrumbItems = [
            { label: this._translateService.instant('Products'), path: appRouts.productsList },
            { label: this.productDetails?.itemName, active: true }
          ]
          this.isLoading = false;
        }
      })
      this.unSubscription.push(getPublishedItemByItemIdUsingSub)
    }else{
      const getItemByItemIdUsingGETSub = this._itemControllerService.getItemByItemIdUsingGET(this.id).subscribe((res: ItemDto) => {
        if (res) {
          this.productDetails = res;
          this.getSimilarProducts()
          this.Certificates = [...this.productDetails?.itemCertificateDtos, ...this.productDetails?.shippingCertificateDtos]
          this.breadcrumbItems = [
            { label: this._translateService.instant('Products'), path: appRouts.productsList },
            { label: this.productDetails?.itemName, active: true }
          ]
          this.isLoading = false;
        }
      })
      this.unSubscription.push(getItemByItemIdUsingGETSub)
    }

  }

  getSimilarProducts() {
    let observable;
    if (!this._sharedService.checkToken()) {
      const getSimilarProductsUsingGETSub = this._publicDataControllerService.getSimilarProductsUsingGET1(this.productDetails?.itemId, this.pageNumber, this.pageSize).subscribe((res: PagePublicItemDto) => {
        if (res) {
          this.isLoading = false;
          this.similarProducts = res.content

        }
      })
      this.unSubscription.push(getSimilarProductsUsingGETSub)
    } else {
      const getSimilarProductsUsingSub = this._itemControllerService.getSimilarProductsUsingGET(this.productDetails?.itemId, this.pageNumber, this.pageSize).subscribe((res: PageItemDto) => {
        if (res) {
          this.isLoading = false;
          this.similarProducts = res.content

        }
      })
      this.unSubscription.push(getSimilarProductsUsingSub)
    }


  }

  innerWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

  }

  onSend() {
    const initialState = {
      class: 'modal-md',
      initialState: {
        supplierId: this.productDetails?.supplier?.supplierId
      }
    };
    this.modalService.show(SendInboxComponent, initialState);

  }


  onAddToFav() {
    let obs;
    if (this.userData?.role === roles?.customer) {
      obs = this._userControllerService.addFavouriteItemUsingPUT1(this.productDetails.itemId)
    } else {
      obs = this._supplierEmployeeControllerService.addFavouriteItemUsingPUT(this.productDetails.itemId)
    }
    const addFavouriteItemUsingPUTSub = obs.subscribe(res => {
      this.toaster.success(this._translateService.instant("addedSuccessfully"))
    })
    this.unSubscription.push(addFavouriteItemUsingPUTSub)

  }

}
