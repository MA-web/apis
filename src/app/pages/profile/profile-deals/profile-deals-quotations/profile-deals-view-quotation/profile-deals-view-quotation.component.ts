import { Component, Injector, OnInit } from '@angular/core';
import { DealDto, QuotationControllerService, QuotationResponseDto, QuotationVersionDto, QuotationVersionReplyDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deals-view-quotation',
  templateUrl: './profile-deals-view-quotation.component.html',
  styleUrls: ['./profile-deals-view-quotation.component.scss']
})
export class ProfileDealsViewQuotationComponent extends AppBaseComponent implements OnInit {
  quotationDetails:QuotationResponseDto;
  productId:number;
  dealId:number;
  dealDetails:DealDto
  constructor(
    injector: Injector,
    private _quotationControllerService: QuotationControllerService,
    ) {
      super(injector);
      this.route.params.subscribe(param =>{
        console.log('param: ', param);
        this.dealId = +param['dealId']
        this.productId = +param['productId']
      })
     }

  ngOnInit(): void {
    this._sharedService.sendQuotationsReplies.subscribe((res:QuotationResponseDto) =>{
      this.quotationDetails = res
    })

    const sendDealSub = this._sharedService.sendDeal.subscribe((res: DealDto) => {
      this.dealDetails = res
    })
    this.unSubscription.push(sendDealSub)

  }

  onAccept(){
    if(this.quotationDetails?.quotationVersions?.length>0){
      let lastQuotation:QuotationVersionReplyDto =  this.quotationDetails?.quotationVersions[this.quotationDetails?.quotationVersions?.length-1];

      let body:QuotationVersionReplyDto = {
        currency:lastQuotation?.currency,
        finalPrice :lastQuotation?.finalPrice,
        finalQuantity:lastQuotation?.finalQuantity,
        shipmentIncludedDocuments: lastQuotation?.shipmentIncludedDocuments,
        specialPrecaution: lastQuotation?.specialPrecaution,
        termsConditions: lastQuotation?.termsConditions,
        uom:lastQuotation.uom,
      }
     const acceptQuotationUsingSub = this._quotationControllerService.acceptQuotationUsingPUT(this.quotationDetails?.quotationId,body).subscribe((res:QuotationVersionDto) =>{ 
      if(res){
        this.router.navigate(['/profile/deals/orders', this.dealId, this.productId])
      }
     })
 
     this.unSubscription.push(acceptQuotationUsingSub)
    }
   
  }

  onReject(){
    
    if(this.quotationDetails?.quotationVersions?.length>0){
      let lastQuotation:QuotationVersionReplyDto =  this.quotationDetails?.quotationVersions[this.quotationDetails?.quotationVersions?.length-1];

      let body:QuotationVersionReplyDto = {
        currency:lastQuotation?.currency,
        finalPrice :lastQuotation?.finalPrice,
        finalQuantity:lastQuotation?.finalQuantity,
        shipmentIncludedDocuments: lastQuotation?.shipmentIncludedDocuments,
        specialPrecaution: lastQuotation?.specialPrecaution,
        termsConditions: lastQuotation?.termsConditions,
        uom:lastQuotation.uom,
      }
     const rejectQuotationUsingSub = this._quotationControllerService.rejectQuotationUsingPUT(this.quotationDetails?.quotationId,body).subscribe((res:QuotationVersionDto) =>{ })
      this.unSubscription.push(rejectQuotationUsingSub)
    }
  }

  canReplyCustomer(){
    if(this.quotationDetails?.status === 0 || this.quotationDetails?.status === 2){
      return true
    }
    return false
  }

  canReplySupplier(){
    if( this.quotationDetails?.status === 1){
      return true
    }
    return false
  }

  canAcceptSupplier(){
    if( this.quotationDetails?.status === 1){
      return true
    }
    return false
  }

  canRejectSupplier(){
    if(  this.quotationDetails?.status === 1){
      return true
    }
    return false
  }

  canMakeQuotation(){
    if(this.dealDetails?.status === DealDto.StatusEnum?.INQUIRYDONE){
      return true
    }
    return false
  }
  onMakeQuotation(){
    this.router.navigate([`/profile/deals/quotations/${this.dealId}/${this.productId}/send-quotation`])
  }
}
