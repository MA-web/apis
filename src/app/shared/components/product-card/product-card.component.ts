import { Component, Injector, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { PublicItemDto, UserControllerService } from 'src/app/@api';
import { AppBaseComponent } from '../app-base/app-base.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends AppBaseComponent implements OnInit {
  @Input() bgWhite: string = ''

  @Input() product: PublicItemDto;

  @Input() fav: boolean = false
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
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
      const addFavouriteItemUsingPUTSub = this._userControllerService.addFavouriteItemUsingPUT(this.product.itemId).subscribe(res => {
        this.toaster.success("addedSuccessfully")
      })
      this.unSubscription.push(addFavouriteItemUsingPUTSub)
    }else{
      const removeFavouriteItemUsingDELETESub = this._userControllerService.removeFavouriteItemUsingDELETE(this.product.itemId).subscribe(res => {
        this.toaster.success("removedSuccessfully")
        this._sharedService.sendRefresh.next(true)
      })
      this.unSubscription.push(removeFavouriteItemUsingDELETESub)
    }
  }


}
