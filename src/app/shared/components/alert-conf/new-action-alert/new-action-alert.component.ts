import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CancelAccountRequestDto, NewsControllerService, ItemControllerService } from 'src/app/@api';
import { AppBaseComponent } from '../../app-base/app-base.component';
@Component({
  selector: 'app-new-action-alert',
  templateUrl: './new-action-alert.component.html',
  styleUrls: ['./new-action-alert.component.scss']
})
export class NewActionAlertComponent extends AppBaseComponent implements OnInit, OnDestroy {
  action: string = '';
  newId: number;
  message:string='';
  constructor(
    injector: Injector,
    private _newsControllerService: NewsControllerService,
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
        const deleteItemUsingDELETESub = this._newsControllerService.deleteNewsUsingDELETE(this.newId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('removedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(deleteItemUsingDELETESub)
        break;
      case 'Republish':
        const publishItemUsingPUTSub = this._newsControllerService.publishNewsUsingPUT(this.newId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('publishedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(publishItemUsingPUTSub)
        break;
      case 'UnPublish':
        this.message = 'Are you sure to Un Un Publish?'
        const unPublishItemUsingPUTSub = this._newsControllerService.unPublishNewsUsingPUT(this.newId).subscribe((res) => {
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
