import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { CancelAccountRequestDto, EventControllerService, ItemControllerService } from 'src/app/@api';
import { AppBaseComponent } from '../../app-base/app-base.component';
@Component({
  selector: 'app-event-action-alert',
  templateUrl: './event-action-alert.component.html',
  styleUrls: ['./event-action-alert.component.scss']
})
export class EventActionAlertComponent extends AppBaseComponent implements OnInit, OnDestroy {
  action: string = '';
  eventId: number;
  message:string='';
  constructor(
    injector: Injector,
    private _eventControllerService: EventControllerService,
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
        const deleteItemUsingDELETESub = this._eventControllerService.deleteEventUsingDELETE(this.eventId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('removedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(deleteItemUsingDELETESub)
        break;
      case 'Republish':
        const publishItemUsingPUTSub = this._eventControllerService.publishUsingPUT(this.eventId).subscribe((res) => {
          this.toaster.success(this._translateService.instant('publishedSuccessfully'))
          this._sharedService.sendRefresh.next(true)
          this.bsModalRef.hide()
        })
        this.unSubscription.push(publishItemUsingPUTSub)
        break;
      case 'UnPublish':
        this.message = 'Are you sure to Un Un Publish?'
        const unPublishItemUsingPUTSub = this._eventControllerService.unPublishUsingPUT(this.eventId).subscribe((res) => {
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
