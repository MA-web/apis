import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { DealDto, InvoiceControllerService, InvoiceDto, InvoiceRequestDto, OrderDto, QuotationVersionDto, ViewInquiryMainDataDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-invoice-filling',
  templateUrl: './invoice-filling.component.html',
  styleUrls: ['./invoice-filling.component.scss']
})
export class InvoiceFillingComponent extends AppBaseComponent implements OnInit, OnDestroy {
  productId: number;
  dealId: number;
  InquiryDetails: ViewInquiryMainDataDto
  invoiceDetails: InvoiceDto
  dealDetails:DealDto
  @Input() lastApprovedQuotation: QuotationVersionDto;
  @Input() lastApprovedOrder: OrderDto;
  constructor(
    injector: Injector,
    private InvoiceControllerService: InvoiceControllerService
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.productId = +param['productId']
      this.dealId = +param['dealId']
    })
  }
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    const sendInquiryRepliesSub = this._sharedService.sendInquiryReplies.subscribe((res: ViewInquiryMainDataDto) => {
      if (res) {
        this.InquiryDetails = res;
      }
    })
    this.unSubscription.push(sendInquiryRepliesSub)

    const sendInvoiceRepliesSub = this._sharedService.sendInvoiceReplies.subscribe((res: InvoiceDto) => {
      console.log('res: ', res);
      
      this.invoiceDetails = res
    })
    this.unSubscription.push(sendInvoiceRepliesSub)

    const sendDealSub = this._sharedService.sendDeal.subscribe((res: DealDto) => {
      this.dealDetails = res
    })
    this.unSubscription.push(sendDealSub)

    this.fields = [
      {
        type: 'accordion',
        fieldGroup: [
          /*****************************Comments************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('Comments'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'Comments',
                type: 'textarea',
                templateOptions: {
                  placeholder: this._translateService.instant('Comments'),
                  rows: 5
                },
                hideExpression: this.userData?.role === roles?.customer

              },
             
            ],
          },



        ],
      }
    ]
  }
  onSubmit() {
    if(this.InquiryDetails.replies?.length > 1){
      let body: InvoiceRequestDto = {
        comment: this.model?.Comments,
        dealId: this.dealId,
        inquiryVersion: this.InquiryDetails.replies[this.InquiryDetails.replies?.length - 1],
        order: {
          orderId: this.lastApprovedOrder?.orderId,
        },
  
        quotationVersion: {
          quotationVersionId: this.lastApprovedQuotation?.quotationVersionId
        }
      }
      
      const addInvoiceUsingSub = this.InvoiceControllerService.addInvoiceUsingPOST(body).subscribe((res: InvoiceDto) => {
    
       window.location.reload()
      })
      this.unSubscription.push(addInvoiceUsingSub)
    }
  
  }

  AcceptDeal(){
    const acceptInvoiceUsingSub = this.InvoiceControllerService.acceptInvoiceUsingPUT(this.invoiceDetails?.invoiceId).subscribe((res: InvoiceDto) => {
      this.router.navigate(['/profile/deals/Completed', this.dealId])
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
}
