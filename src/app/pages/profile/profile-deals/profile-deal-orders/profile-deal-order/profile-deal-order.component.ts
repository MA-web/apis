import { Component, Injector, Input, OnInit } from '@angular/core';
import { OrderControllerService, OrderDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-order',
  templateUrl: './profile-deal-order.component.html',
  styleUrls: ['./profile-deal-order.component.scss']
})
export class ProfileDealOrderComponent extends AppBaseComponent implements OnInit {

 @Input() orderDetails: OrderDto

 @Input() lastApprovedQuotation:boolean = false;
 
  constructor(
    injector: Injector,

  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.dealId = +param['dealId']
    })
  }

  ngOnInit(): void {
    console.log(this.orderDetails);
  }

}
