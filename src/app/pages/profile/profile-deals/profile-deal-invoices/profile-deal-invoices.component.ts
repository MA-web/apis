import { Component, Injector, Input, OnInit } from '@angular/core';
import { DealDto, InquiryVersionIdDto, InquiryVersionResponseDto, InvoiceControllerService, InvoiceDto, ItemDto, OrderDto, QuotationVersionDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-invoices',
  templateUrl: './profile-deal-invoices.component.html',
  styleUrls: ['./profile-deal-invoices.component.scss']
})
export class ProfileDealInvoicesComponent extends AppBaseComponent implements OnInit {

  invoiceDetails: InvoiceDto;

  dealDetails: DealDto
  lastApproveInquiry: InquiryVersionResponseDto;
  lastApprovedQuotation:QuotationVersionDto
  lastApprovedOrder:OrderDto;

  isLoadingQuo = false
  constructor(
    injector: Injector,
    private InvoiceControllerService: InvoiceControllerService
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.dealId = +param['dealId']
      this.productId = +param['productId']
    })
  }

  ngOnInit(): void {
   const sendInvoiceRepliesSub = this._sharedService.sendInvoiceReplies.subscribe((res: InvoiceDto) => {
      this.invoiceDetails = res
    })
    this.unSubscription.push(sendInvoiceRepliesSub)
    const sendDealSub = this._sharedService.sendDeal.subscribe((res: DealDto) => {
      this.dealDetails = res
    })
    this.unSubscription.push(sendDealSub)

    this.sendLastApprovedInquiry()
    this.sendProductDetails()
    this.getLastApprovedQuotationUsingGET()
    this.sendLastApprovedOrder()
  }


  sendLastApprovedInquiry() {
    const sendLastApprovedInquirySub = this._sharedService.sendLastApprovedInquiry.subscribe(res => {
      if (res) {
        this.lastApproveInquiry = res
      }
    })
    this.unSubscription.push(sendLastApprovedInquirySub)

  }
  getLastApprovedQuotationUsingGET() {
    this.isLoadingQuo = true
    const sendLastApprovedQuotationSub = this._sharedService.sendLastApprovedQuotation.subscribe((res: QuotationVersionDto) => {
      if (res) {
        this.isLoadingQuo = false
        this.lastApprovedQuotation = res
      }
    })
    this.unSubscription.push(sendLastApprovedQuotationSub)
  }
  sendLastApprovedOrder(){
    const sendLastApprovedOrderSub = this._sharedService.sendLastApprovedOrder.subscribe((res:OrderDto) =>{
      this.lastApprovedOrder = res
    })
    this.unSubscription.push(sendLastApprovedOrderSub)
  }

  sendProductDetails() {
    const sendProductDetailsSub = this._sharedService.sendProductDetails.subscribe((res: ItemDto) => {
      if (res) {
        this.productDetails = res;
        console.log(' this.productDetails: ',  this.productDetails);
      }
    })
    this.unSubscription.push(sendProductDetailsSub)
  }

  canSupplierReply(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.ORDERDONE){
      return true
    }else{
      false
    }
  }

  canViewInvoice(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.INVOICEINPROGRESS || this.dealDetails?.status === DealDto?.StatusEnum?.ACCEPTED){
      return true
    }else{
      false
    }
  }

  waitingSupplierReply(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.ORDERDONE){
      return true
    }
    return false
  }
  waitingCustomerReply(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.INVOICEINPROGRESS){
      return true
    }
    return false
  }

  AcceptDeal(){
    const acceptInvoiceUsingSub = this.InvoiceControllerService.acceptInvoiceUsingPUT(this.invoiceDetails?.invoiceId).subscribe((res: InvoiceDto) => {
      window.location.reload()
     })
     this.unSubscription.push(acceptInvoiceUsingSub)
  }

  onReject(){
    const rejectInvoiceUsingSub = this.InvoiceControllerService.rejectInvoiceUsingPUT(this.invoiceDetails?.invoiceId).subscribe((res: InvoiceDto) => {
      this.router.navigate(['/profile/deals'])
     })
     this.unSubscription.push(rejectInvoiceUsingSub)
  }

  canAcceptOrReject(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.INVOICEINPROGRESS){
      return true
    }else{
      return false
    }
  }

  onDealCompleted(){
    if(this.dealDetails?.status === DealDto?.StatusEnum?.ACCEPTED){
      return true
    }else{
      return false
    }
  }
}
