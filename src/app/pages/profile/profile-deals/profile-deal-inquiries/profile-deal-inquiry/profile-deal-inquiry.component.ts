import { Component, Injector, Input, OnInit } from '@angular/core';
import { InquiryControllerService, InquiryVersionIdDto, InquiryVersionResponseDto, ItemDraftDto, ItemDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-inquiry',
  templateUrl: './profile-deal-inquiry.component.html',
  styleUrls: ['./profile-deal-inquiry.component.scss']
})
export class ProfileDealInquiryComponent extends AppBaseComponent implements OnInit {
  @Input() reply: InquiryVersionIdDto
  @Input() odd
  @Input() productDetails:ItemDto;

  @Input() details:InquiryVersionResponseDto;
  @Input() lastApproveInquiry:boolean = false
  prices = [
    {
      from: { value: 120, type: 'gram', fromUser: true },
      to: { value: 220, type: 'gram', fromUser: true },
      price: { value: 220, type: 'USD', fromUser: true }
    },
    {
      from: { value: 120, type: 'gram', fromUser: false },
      to: { value: 220, type: 'gram', fromUser: false },
      price: { value: 220, type: 'USD', fromUser: false }
    }
  ]

  constructor(
    injector: Injector,
    private InquiryControllerService: InquiryControllerService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if(!this.lastApproveInquiry){
      if(this.reply){
        const viewInquiryVersionUsingSub = this.InquiryControllerService.viewInquiryVersionUsingGET(this.reply?.inquiryVersionId).subscribe((res: InquiryVersionResponseDto) => {
          this.details = res
        })
        this.unSubscription.push(viewInquiryVersionUsingSub)
       }
    }
   
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
