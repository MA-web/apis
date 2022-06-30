import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { AccountCancelControllerService, CancelAccountRequestDto } from 'src/app/@api';
import { AppBaseComponent } from '../../app-base/app-base.component';
@Component({
  selector: 'app-delete-account-alert',
  templateUrl: './delete-account-alert.component.html',
  styleUrls: ['./delete-account-alert.component.scss']
})
export class DeleteAccountAlertComponent extends AppBaseComponent implements OnInit, OnDestroy {


  constructor(
    injector: Injector,
    private accountCancelControllerService: AccountCancelControllerService,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.isLoadingForm = true
  }
  async ngOnInit() {

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className: "noFormGroup",
        key: 'cancelReason',
        type: 'textarea',
        templateOptions: {
          placeholder: this._translateService.instant('write_reasons'),
          rows: 7
        }
      },
    ]
  }

  onSubmit() {
    this.isSubmit = true;
    const body: CancelAccountRequestDto = {
      cancelReason: this.model?.cancelReason
    }
    const requestCancelAccountSub = this.accountCancelControllerService.requestCancelAccountUsingPOST(body).pipe(
      finalize(() =>{
        this.isSubmit = false;
      })
    ).subscribe(res => {
       this.bsModalRef.hide()
    })
    this.unSubscription.push(requestCancelAccountSub)

  }

}
