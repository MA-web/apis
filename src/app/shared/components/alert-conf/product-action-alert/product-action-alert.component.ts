import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CancelAccountRequestDto, ItemControllerService } from 'src/app/@api';
import { AppBaseComponent } from '../../app-base/app-base.component';
@Component({
  selector: 'app-product-action-alert',
  templateUrl: './product-action-alert.component.html',
  styleUrls: ['./product-action-alert.component.scss']
})
export class ProductActionAlertComponent extends AppBaseComponent implements OnInit, OnDestroy {
  action: string = '';
  productId: number;
  message:string='';
  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.isLoadingForm = true
  }
  async ngOnInit() {

    await this._translateService.get('dummyTranslation').toPromise().then();
    switch (this.action) {
      case 'delete':
        this.message = 'Are you sure to Delete?'
        break;
      case 'Republish':
        this.message = 'Are you sure to Republish?'
        break;
      case 'UnPublish':
        this.message = 'Are you sure to UnPublish?'
     
        break;
      default:
        break;
    }
  }

  onSubmit() {
    // this.isSubmit = true;

    switch (this.action) {
      case 'delete':
        const deleteItemUsingDELETESub = this._itemControllerService.deleteItemUsingDELETE(this.productId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('removedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(deleteItemUsingDELETESub)
        break;
      case 'Republish':
        const publishItemUsingPUTSub = this._itemControllerService.publishItemUsingPUT(this.productId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('publishedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(publishItemUsingPUTSub)
        break;
      case 'UnPublish':
        this.message = 'Are you sure to Un Un Publish?'
        const unPublishItemUsingPUTSub = this._itemControllerService.unPublishItemUsingPUT(this.productId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('unPublishSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(unPublishItemUsingPUTSub)
        break;
      default:
        break;
    }
 
  }

}
