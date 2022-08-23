import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EventDto, ItemControllerService, ItemDto, PartnerDto } from 'src/app/@api';
import { EventActionAlertComponent } from 'src/app/shared/components/alert-conf/event-action-alert/event-action-alert.component';
import { PartnerActionAlertComponent } from 'src/app/shared/components/alert-conf/partner-action-alert/partner-action-alert.component';
import { ProductActionAlertComponent } from 'src/app/shared/components/alert-conf/product-action-alert/product-action-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Input() partner: PartnerDto;
  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    private modalService: BsModalService
  ) {
    super(injector)
  }
  ngOnInit(): void {
  }


  onAction(action:string){
    const initialState: any = {
      class: 'modal-md',
      initialState: {
        action:action,
        // productId:this.event?.itemId,
        partnerId:this.partner?.partnerId,

      }
    };
    this.modalService.show(PartnerActionAlertComponent, initialState);

  }

}
