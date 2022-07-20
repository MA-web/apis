import { Component, Injector, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BankAccountDto, DealDto, InquiryVersionIdDto, InquiryVersionResponseDto, InvoiceDto, ItemDto, OrderDto, QuotationVersionDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-deal-preview',
  templateUrl: './deal-preview.component.html',
  styleUrls: ['./deal-preview.component.scss']
})
export class DealPreviewComponent extends AppBaseComponent implements OnInit {
  @Input() dealDetails: DealDto
  @Input() invoiceDetails: InvoiceDto;
  @Input() lastApproveInquiry: InquiryVersionResponseDto;
  @Input() lastApprovedQuotation: QuotationVersionDto
  @Input() lastApprovedOrder: OrderDto;
  @Input() productDetails: ItemDto
  bankAccount: BankAccountDto;
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.isLoadingForm = true
  }

  ngOnInit(): void {
    this.bankAccount = this.lastApprovedQuotation?.quotation?.bankAccount
  }
  splitHour(value){
    return +value?.split(/hr(.*)/)[0]
  }

  returnProductionCapacityUnit(value){
      return value?.split("/")[0]?.replace(/[^a-zA-Z]+/g, '')
  }

  returnEstimatedDeliveryLeadTime(value){
    return value?.match(/\d+/)[0]
  }
}
