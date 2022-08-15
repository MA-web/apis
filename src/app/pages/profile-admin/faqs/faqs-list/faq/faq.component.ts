import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FaqDto, ItemControllerService, ItemDto } from 'src/app/@api';
import { FaqActionAlertComponent } from 'src/app/shared/components/alert-conf/faq-action-alert/faq-action-alert.component';
import { ProductActionAlertComponent } from 'src/app/shared/components/alert-conf/product-action-alert/product-action-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Input() faq: FaqDto;
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
        // productId:this.faq?.itemId,
        faqId:this.faq?.faqId,

      }
    };
    this.modalService.show(FaqActionAlertComponent, initialState);

  }

}
