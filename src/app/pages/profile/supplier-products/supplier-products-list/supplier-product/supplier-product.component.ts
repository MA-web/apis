import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ItemControllerService, ItemDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-supplier-product',
  templateUrl: './supplier-product.component.html',
  styleUrls: ['./supplier-product.component.scss']
})
export class SupplierProductComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Input() product: ItemDto;

  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
  ) {
    super(injector)
  }
  ngOnInit(): void {
  }


  onDelete(){
   const deleteItemUsingDELETESub = this._itemControllerService.deleteItemUsingDELETE(this.product?.itemId).subscribe((res) =>{
    this.toaster.success(this._translateService.instant('removedSuccessfully'))
    this._sharedService.sendRefresh.next(true)
    })
    this.unSubscription.push(deleteItemUsingDELETESub)
  }

  onRepublish(){
    const publishItemUsingPUTSub = this._itemControllerService.publishItemUsingPUT(this.product?.itemId).subscribe((res) =>{
      this.toaster.success(this._translateService.instant('removedSuccessfully'))
      this._sharedService.sendRefresh.next(true)
      })
      this.unSubscription.push(publishItemUsingPUTSub)
  }

  onUnPublish(){
    // const publishItemUsingPUTSub = this._itemControllerService.publishItemUsingPUT(this.product?.itemId).subscribe((res) =>{
    //   this.toaster.success(this._translateService.instant('removedSuccessfully'))
    //   this._sharedService.sendRefresh.next(true)
    //   })
    //   this.unSubscription.push(publishItemUsingPUTSub)
  }
}
