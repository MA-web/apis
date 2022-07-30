import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NewsDto, ItemControllerService, ItemDto } from 'src/app/@api';
import { NewActionAlertComponent } from 'src/app/shared/components/alert-conf/new-action-alert/new-action-alert.component';
import { ProductActionAlertComponent } from 'src/app/shared/components/alert-conf/product-action-alert/product-action-alert.component';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @Input() newData: NewsDto;
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
        // productId:this.new?.itemId,
        newId:this.newData?.newsId,

      }
    };
    this.modalService.show(NewActionAlertComponent, initialState);

  }

}
