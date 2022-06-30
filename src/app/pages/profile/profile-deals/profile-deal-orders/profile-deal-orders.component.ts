import { Component, Injector, OnInit } from '@angular/core';
import { DealDto, InquiryVersionResponseDto, ItemDto, OrderControllerService, OrderDto, QuotationControllerService, QuotationVersionDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-orders',
  templateUrl: './profile-deal-orders.component.html',
  styleUrls: ['./profile-deal-orders.component.scss']
})
export class ProfileDealOrdersComponent extends AppBaseComponent implements OnInit {
  orderDetails: OrderDto;
  dealDetails: DealDto
  lastApprovedQuotation: QuotationVersionDto
  lastApproveInquiry: InquiryVersionResponseDto;

  constructor(
    injector: Injector,
    private _quotationControllerService: QuotationControllerService,
    private _orderControllerService: OrderControllerService


  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.dealId = +param['dealId']
      this.productId = +param['productId']
    })
  }
  ngOnInit(): void {

    const sendOrderRepliesSub = this._sharedService.sendOrderReplies.subscribe((res: OrderDto) => {
      this.orderDetails = res
    })
    this.unSubscription.push(sendOrderRepliesSub)

    const sendDealSub = this._sharedService.sendDeal.subscribe((res: DealDto) => {
      this.dealDetails = res
    })
    this.unSubscription.push(sendDealSub)

    this.getLastApprovedQuotationUsingGET()
    this.sendLastApprovedInquiry()
    this.sendProductDetails()

  }

  getLastApprovedQuotationUsingGET() {
    const sendLastApprovedQuotationSub = this._sharedService.sendLastApprovedQuotation.subscribe((res: QuotationVersionDto) => {
      if (res) {
        this.lastApprovedQuotation = res
      }
    })
    this.unSubscription.push(sendLastApprovedQuotationSub)
  }
  sendLastApprovedInquiry() {
    const sendLastApprovedInquirySub = this._sharedService.sendLastApprovedInquiry.subscribe(res => {
      if (res) {
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

  onAccept() {
    const acceptOrderUsingSub = this._orderControllerService.acceptOrderUsingPUT(this.orderDetails?.orderId).subscribe((res: OrderDto) => {
      if(res){
        this.router.navigate(['/profile/deals/invoices',this.dealId,this.productId])
      }
    })
    this.unSubscription.push(acceptOrderUsingSub)
  }

  onReject() {
    const rejectOrderUsingPUTSub = this._orderControllerService.rejectOrderUsingPUT(this.orderDetails?.orderId).subscribe((res: OrderDto) => {
      this.router.navigate(['/profile/deals/orders'])
    })
    this.unSubscription.push(rejectOrderUsingPUTSub)
  }

 
  canViewSupplierReply(){
    if(  this.dealDetails?.status === DealDto.StatusEnum.QUOTATIONDONE){
      return false
    }
    return true
  }

  canWaitReplyCustomer(){
    if(this.dealDetails?.status === DealDto.StatusEnum.ORDERINPROGRESS){
      return true
    }
    return false
  }

  canWaitReplySupplier(){
    if(this.dealDetails?.status === DealDto.StatusEnum.ORDERINPROGRESS || this.dealDetails?.status === DealDto.StatusEnum.ORDERDONE){
      return false
    }
    return true
  }

  canSendInvoice(){
    if(this.dealDetails?.status === DealDto.StatusEnum.ORDERDONE){
      return true
    }
    return false
  }
}
