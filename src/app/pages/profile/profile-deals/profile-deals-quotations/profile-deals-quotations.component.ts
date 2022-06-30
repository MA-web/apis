import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { InquiryControllerService, InquiryVersionResponseDto, ItemDto, QuotationControllerService, QuotationVersionDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deals-quotations',
  templateUrl: './profile-deals-quotations.component.html',
  styleUrls: ['./profile-deals-quotations.component.scss']
})
export class ProfileDealsQuotationsComponent extends AppBaseComponent  implements OnInit, OnDestroy {
  productId:number;
  dealId:number;
  QuotationVersionDto
  lastApproveInquiry:InquiryVersionResponseDto;
  productDetails:ItemDto;

  constructor(
    injector: Injector,
    private _inquiryControllerService: InquiryControllerService
    ) {
      super(injector);
      this.route.params.subscribe(param =>{
        
        this.dealId = +param['dealId']
        this.productId = +param['productId']
        this.sendProductDetails()
      })
     }
   ngOnInit() {
    const sendLastApprovedInquirySub = this._sharedService.sendLastApprovedInquiry.subscribe((res:InquiryVersionResponseDto) =>{
     if(res){
      this.lastApproveInquiry = res
     }
    })
    this.unSubscription.push(sendLastApprovedInquirySub)
    
    
  }
  sendProductDetails() {
    const sendProductDetailsSub = this._sharedService.sendProductDetails.subscribe((res: ItemDto) => {
      if (res) {
        this.productDetails = res;
      }
    })
    this.unSubscription.push(sendProductDetailsSub)
  }
}
