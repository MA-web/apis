import { Component, Input, OnInit } from '@angular/core';
import { BankAccountDto, QuotationVersionDto, QuotationVersionReplyDto } from 'src/app/@api';

@Component({
  selector: 'app-profile-deal-quotation',
  templateUrl: './profile-deal-quotation.component.html',
  styleUrls: ['./profile-deal-quotation.component.scss']
})
export class ProfileDealQuotationComponent implements OnInit {
  @Input() isOpen: boolean = false

  @Input() lastApproveQuotation: QuotationVersionDto
  @Input() quotation: QuotationVersionReplyDto
  @Input() bankAccount: BankAccountDto
  @Input() odd;
  @Input() index;
  @Input() lastApprovedQuotation: boolean = false

  isLoading = false;

  constructor() {
  }

  ngOnInit(): void {
    if (this.lastApproveQuotation) {
      console.log('this.lastApproveQuotation: ', this.lastApproveQuotation);
      this.quotation = this.lastApproveQuotation
      this.bankAccount = this.lastApproveQuotation?.quotation?.bankAccount
    }
   
  }

}
