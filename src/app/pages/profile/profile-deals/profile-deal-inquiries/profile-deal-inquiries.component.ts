import { Component, Injector, OnInit } from '@angular/core';
import { DealDto, InquiryControllerService, ItemControllerService, ItemDto, RejectionDto, ViewInquiryMainDataDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-deal-inquiries',
  templateUrl: './profile-deal-inquiries.component.html',
  styleUrls: ['./profile-deal-inquiries.component.scss']
})
export class ProfileDealInquiriesComponent extends AppBaseComponent implements OnInit {
  InquiryDetails:ViewInquiryMainDataDto
  productId:number;
  dealId:number;
  productDetails:ItemDto;
  DealDetails:DealDto
  constructor(
    injector: Injector,
    private _inquiryControllerService: InquiryControllerService

   ) {
    super(injector);
    this.route.params.subscribe(param =>{
      this.dealId = +param['dealId']
      this.productId = +param['productId']
    })
   }
  ngOnInit(): void {
    const sendInquiryRepliesSub =  this._sharedService.sendInquiryReplies.subscribe((res:ViewInquiryMainDataDto) =>{
      if(res){
        this.InquiryDetails = res;
      }
    })
    this.unSubscription.push(sendInquiryRepliesSub)
    const sendProductDetailsSub = this._sharedService.sendProductDetails.subscribe((res:ItemDto) =>{
      if(res){
        this.productDetails = res
      }
    })
    this.unSubscription.push(sendProductDetailsSub)

    this._sharedService.sendDeal.subscribe((res:DealDto) =>{
        this.DealDetails = res
    })
  }

 

  onAcceptInquiry(){
   const acceptInquiryUsingSub = this._inquiryControllerService.acceptInquiryUsingPUT(this.InquiryDetails?.inquiryId).subscribe((res:ViewInquiryMainDataDto) =>{
      if(res){
        if(this.userData?.role === roles?.supplier){
          this.router.navigate([`/profile/deals/quotations/${this.dealId}/${this.productId}/send-quotation`])
        }else{
          this.router.navigate([`/profile/deals/inquiries`])
        }

      }
    })
    this.unSubscription.push(acceptInquiryUsingSub)
  }

  onRejectInquiry(){
    let rejectionDto:RejectionDto = {
      adjustment:' '
    }
    const acceptInquiryUsingSub = this._inquiryControllerService.rejectInquiryUsingPUT(this.InquiryDetails?.inquiryId,rejectionDto).subscribe((res:ViewInquiryMainDataDto) =>{
      if(res){
        this.router.navigate(['/profile/deals/inquiries'])
      }
    })
    this.unSubscription.push(acceptInquiryUsingSub)
  }


  canReplyCustomer(){
    if( this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.SUPPLIERMODIFIED){
      return true
    }
    return false
  }
  canReplySupplier(){
    if(this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.CREATED || this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.USERMODIFIED){
      return true
    }
    return false
  }
  canAcceptCustomer(){
    if(this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.SUPPLIERMODIFIED ){
      return true
    }
    return false
  }
  canRejectCustomer(){
    if(
      this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.SUPPLIERMODIFIED ||
      this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.CREATED  ){
      return true
    }
    return false
  }

  canAcceptSupplier(){
    if(this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.CREATED ||  this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.USERMODIFIED ){
      return true
    }
    return false
  }
  canRejectSupplier(){
    if(
      this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.CREATED ||  
      this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.USERMODIFIED 
      ){
      return true
    }
    return false
  }

  canMakeQuotation(){
    if(
      this.InquiryDetails?.status === ViewInquiryMainDataDto.StatusEnum.ACCEPTED && this.DealDetails.status === DealDto.StatusEnum.INQUIRYDONE){
      return true
    }
    return false
  }

  onMakeQuotation(){
    this.router.navigate([`/profile/deals/quotations/${this.dealId}/${this.productId}/send-quotation`])
  }
}
