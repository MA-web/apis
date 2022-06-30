import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { DealDto, InvoiceControllerService, InvoiceDto, InvoiceRequestDto, OrderDto, QuotationResponseDto, QuotationVersionDto, ViewInquiryMainDataDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-deal-invoice',
  templateUrl: './profile-deal-invoice.component.html',
  styleUrls: ['./profile-deal-invoice.component.scss']
})
export class ProfileDealInvoiceComponent extends AppBaseComponent implements OnInit, OnDestroy {
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
        comment: this.model?.comment,
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

 
}
