import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CancelAccountRequestDto, FaqControllerService, ItemControllerService, PartnersControllerService } from 'src/app/@api';
import { AppBaseComponent } from '../../app-base/app-base.component';
@Component({
  selector: 'app-partner-action-alert',
  templateUrl: './partner-action-alert.component.html',
  styleUrls: ['./partner-action-alert.component.scss']
})
export class PartnerActionAlertComponent extends AppBaseComponent implements OnInit, OnDestroy {
  action: string = '';
  partnerId: number;
  message:string='';
  constructor(
    injector: Injector,
    private _partnersControllerService: PartnersControllerService,
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
        const deleteItemUsingDELETESub = this._partnersControllerService.deletePartnerUsingDELETE(this.partnerId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('removedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(deleteItemUsingDELETESub)
        break;
      case 'Republish':
        const publishItemUsingPUTSub = this._partnersControllerService.publishUsingPUT2(this.partnerId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('publishedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(publishItemUsingPUTSub)
        break;
      case 'UnPublish':
        this.message = 'Are you sure to Un Un Publish?'
        const unPublishItemUsingPUTSub = this._partnersControllerService.unPublishUsingPUT2(this.partnerId).subscribe((res) => {
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
