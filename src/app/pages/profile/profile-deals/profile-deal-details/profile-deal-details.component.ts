import { Component, Injector, OnInit } from '@angular/core';
import { DealControllerService, DealDto, InquiryControllerService, InquiryVersionResponseDto, InvoiceDto, ItemControllerService, ItemDto, OrderControllerService, OrderDto, QuotationControllerService, QuotationResponseDto, QuotationVersionDto, ViewInquiryMainDataDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-details',
  templateUrl: './profile-deal-details.component.html',
  styleUrls: ['./profile-deal-details.component.scss']
})
export class ProfileDealDetailsComponent extends AppBaseComponent implements OnInit {

  dealType: string = 'inquiry';
  dealId: number;
  productId: number;
  inquiryDetails: ViewInquiryMainDataDto;
  quotationDetails: QuotationResponseDto;
  orderDetails: OrderDto;
  invoiceDetails: InvoiceDto
  DealDetails: DealDto

  constructor(
    injector: Injector,
    private DealControllerService: DealControllerService,
    private _itemControllerService: ItemControllerService,
    private _inquiryControllerService: InquiryControllerService,
    private _quotationControllerService: QuotationControllerService,
    private _orderControllerService: OrderControllerService

  ) {
    super(injector);

    this.route.params.subscribe(param => {

      this.productId = +param['productId']
      this.dealId = +param['dealId']
      this.getDeal()
    })
    this.getProductDetails()

  }

  getDeal() {
    const viewInquiryMainDataUsingSub = this.DealControllerService.getDealByDealIdUsingGET(this.dealId).subscribe((res: DealDto) => {
      if (res) {
        this.DealDetails = res
        this._sharedService.sendDeal.next(res)
        this._sharedService.sendInquiryReplies.next(this.inquiryDetails)
        this.route.url.subscribe(url => {

          if (url[0].path === 'inquiries') {
            this.getInquiryDetails()

          } else if (url[0].path === 'quotations') {
            if (this.DealDetails.status === DealDto?.StatusEnum?.QUOTATIONINPROGRESS || this.DealDetails.status === DealDto?.StatusEnum?.QUOTATIONDONE) {
              this.getQuotationDetails()
            }

          } else if (url[0].path === 'orders') {
            if (this.DealDetails.status === DealDto?.StatusEnum?.ORDERINPROGRESS || this.DealDetails.status === DealDto?.StatusEnum?.ORDERDONE) {
              this.getOrdersDetails()
            }
          } else {
            if (this.DealDetails.status === DealDto?.StatusEnum?.INVOICEINPROGRESS || this.DealDetails.status === DealDto?.StatusEnum?.ACCEPTED) {
              this.getInvoiceDetails()
           
            }
            this.getInquiryDetails()
           
          }

          if (
            this.DealDetails.status === DealDto?.StatusEnum?.INQUIRYDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.QUOTATIONINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.QUOTATIONDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.ORDERINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.ORDERDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.INVOICEINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.ACCEPTED
          ) {
            this.getLastApprovedInquiry()
          }

          if (
            this.DealDetails.status === DealDto?.StatusEnum?.QUOTATIONDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.ORDERINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.ORDERDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.INVOICEINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.ACCEPTED
          ) {
            this.getLastApprovedQuotationUsingGET()
          }

          if (
            this.DealDetails.status === DealDto?.StatusEnum?.ORDERDONE ||
            this.DealDetails.status === DealDto?.StatusEnum?.INVOICEINPROGRESS ||
            this.DealDetails.status === DealDto?.StatusEnum?.ACCEPTED
          ) {
            this.getAcceptedOrder()
          }

        })


      }
    });
    this.unSubscription.push(viewInquiryMainDataUsingSub)
  }

  async ngOnInit() {
    this.route.url.subscribe((url: any) => {
      this.dealType = url[0]?.path
    })
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Deals') },
      { label: `#${this.dealType} - 12666532`, active: true },
    ]
    this.LookupControllerService.getQuotationStatuesMapUsingGET().subscribe(Res => {
      console.log('Res: ', Res);

    })

    this._sharedService.sendOPenQuotation.subscribe(res =>{
      this.DealDetails.status =DealDto.StatusEnum.QUOTATIONINPROGRESS
    })
  }


  getInquiryDetails() {
    const viewInquiryMainDataUsingSub = this.DealControllerService.getInquiryByDealIdUsingGET(this.dealId).subscribe((res: ViewInquiryMainDataDto) => {
      if (res) {
        this.inquiryDetails = res
        this._sharedService.sendInquiryReplies.next(this.inquiryDetails)
      }
    });
    this.unSubscription.push(viewInquiryMainDataUsingSub)
  }

  getLastApprovedInquiry() {
    const getLastApprovedQuotationUsingSub = this._inquiryControllerService.getLastApprovedInquiryUsingGET(this.dealId).subscribe((res: InquiryVersionResponseDto) => {
      if (res) {
        this._sharedService.sendLastApprovedInquiry.next(res)
      }
    })
    this.unSubscription.push(getLastApprovedQuotationUsingSub)
  }


  getQuotationDetails() {
    const getQuotationByIdUsingSub = this.DealControllerService.getQuotationByIdUsingGET(this.dealId).subscribe((res: QuotationResponseDto) => {
      if (res) {
        this.quotationDetails = res
        this._sharedService.sendQuotationsReplies.next(this.quotationDetails)
      }
    });
    this.unSubscription.push(getQuotationByIdUsingSub)
  }
  getLastApprovedQuotationUsingGET() {
    const getLastApprovedQuotationUsingSub = this._quotationControllerService.getLastApprovedQuotationUsingGET(this.dealId).subscribe((res: QuotationVersionDto) => {
      console.log('res: ', res);
      if (res) {
        this._sharedService.sendLastApprovedQuotation.next(res)
      }
    })
    this.unSubscription.push(getLastApprovedQuotationUsingSub)
  }

  getOrdersDetails() {
    const getOrderByDealIdUsingSub = this.DealControllerService.getOrderByDealIdUsingGET(this.dealId).subscribe((res: OrderDto) => {
      if (res) {
        this.orderDetails = res;
        this._sharedService.sendOrderReplies.next(res)
      }
    })
    this.unSubscription.push(getOrderByDealIdUsingSub)
  }


  getAcceptedOrder() {
    const getAcceptedOrderUsingSub = this._orderControllerService.getAcceptedOrderUsingGET(this.dealId).subscribe((res: OrderDto) => {
      if (res) {
        this._sharedService.sendLastApprovedOrder.next(res)
      }
    })
    this.unSubscription.push(getAcceptedOrderUsingSub)
  }
  getInvoiceDetails() {
    const getInvocieByDealIdUsingSub = this.DealControllerService.getInvocieByDealIdUsingGET(this.dealId).subscribe((res: InvoiceDto) => {
      if (res) {
        this.invoiceDetails = res;
        this._sharedService.sendInvoiceReplies.next(this.invoiceDetails)
      }
    })
    this.unSubscription.push(getInvocieByDealIdUsingSub)
  }

  getProductDetails() {
    const getItemByItemIdUsingSub = this._itemControllerService.getItemByItemIdUsingGET(this.productId).subscribe((res: ItemDto) => {
      if (res) {
        this._sharedService.sendProductDetails.next(res)
        this.isLoading = false
      }
    })
    this.unSubscription.push(getItemByItemIdUsingSub)

  }


  validQuotation() {
    if(this.DealDetails){
      if (
        this.DealDetails.status === DealDto.StatusEnum.INQUIRYDONE ||
        this.DealDetails.status === DealDto.StatusEnum.QUOTATIONINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.QUOTATIONDONE ||
        this.DealDetails.status === DealDto.StatusEnum.ORDERINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.ORDERDONE ||
        this.DealDetails.status === DealDto.StatusEnum.INVOICEINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.ACCEPTED
        ){
          return false
        }else{
          return true
        }
    }
  }

  
  validOrder() {
    if(this.DealDetails){
      if (
        this.DealDetails.status === DealDto.StatusEnum.QUOTATIONDONE ||
        this.DealDetails.status === DealDto.StatusEnum.ORDERINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.ORDERDONE ||
        this.DealDetails.status === DealDto.StatusEnum.INVOICEINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.ACCEPTED
        ){
          return false
        }else{
          return true
        }
    }
  }
  validInvoice() {
    if(this.DealDetails){
      if (
        this.DealDetails.status === DealDto.StatusEnum.ORDERDONE ||
        this.DealDetails.status === DealDto.StatusEnum.INVOICEINPROGRESS ||
        this.DealDetails.status === DealDto.StatusEnum.ACCEPTED
        ){
          return false
        }else{
          return true
        }
    }
  }
}
