import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ItemControllerService, ItemDto } from 'src/app/@api';
import { ProductActionAlertComponent } from 'src/app/shared/components/alert-conf/product-action-alert/product-action-alert.component';
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
        Action:action,
        productId:this.product?.itemId,

      }
    };
    const bsModalRef = this.modalService.show(ProductActionAlertComponent, initialState);

  }

}
