import { Component, Injector, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { ItemDto } from 'src/app/@api';
import { PublicItemDto, UserControllerService } from 'src/app/@api';
import { SupplierEmployeeControllerService } from 'src/app/@api/api/supplierEmployeeController.service';
import { roles } from 'src/environments/environment';
import { AppBaseComponent } from '../app-base/app-base.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends AppBaseComponent implements OnInit {
  @Input() bgWhite: string = ''

  @Input() product: ItemDto;

  @Input() fav: boolean = false
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
    private _supplierEmployeeControllerService:SupplierEmployeeControllerService
  ) {
    super(injector)
  }


  ngOnInit(): void {
  }

  onView() {

    if(this.fav){
      this.router.navigate(['/products/details', this.product?.itemId]);
    }else{
      const navigationExtras: NavigationExtras = { state: { data: this.product } };
      this.router.navigate(['/products/details', this.product?.itemId], navigationExtras);
    }

  }

  onAddToFav(e) {
    e.stopPropagation()
    if(!this.fav){
      let obs;
      if(this.userData?.role === roles?.customer){
        obs =  this._userControllerService.addFavouriteItemUsingPUT(this.product.itemId)
      }else{
        obs =  this._supplierEmployeeControllerService.addFavouriteItemUsingPUT(this.product.itemId)
      }
      const addFavouriteItemUsingPUTSub = obs.subscribe(res => {
        this.toaster.success(this._translateService.instant("addedSuccessfully"))
      })
      this.unSubscription.push(addFavouriteItemUsingPUTSub)
    }else{
      let obs;
      if(this.userData?.role === roles?.customer){
        obs =  this._userControllerService.removeFavouriteItemUsingDELETE(this.product.itemId)
      }else{
        obs =  this._supplierEmployeeControllerService.removeFavouriteItemUsingDELETE(this.product.itemId)
      }
      const removeFavouriteItemUsingDELETESub = obs.subscribe(res => {
        this.toaster.success(this._translateService.instant("removedSuccessfully"))
        this._sharedService.sendRefresh.next(true)
      })
      this.unSubscription.push(removeFavouriteItemUsingDELETESub)
    }
  }


}
