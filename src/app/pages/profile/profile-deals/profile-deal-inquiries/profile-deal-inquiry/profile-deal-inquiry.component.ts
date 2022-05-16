import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-deal-inquiry',
  templateUrl: './profile-deal-inquiry.component.html',
  styleUrls: ['./profile-deal-inquiry.component.scss']
})
export class ProfileDealInquiryComponent implements OnInit {
  @Input() userType :string = ''
  @Input() title :string = ''


  prices = [
    {
      from: { value: 120, type: 'gram',fromUser:true },
      to: { value: 220, type: 'gram' ,fromUser:true  },
      price: { value: 220, type: 'USD' ,fromUser:true }
    },
    {
      from: { value: 120, type: 'gram' ,fromUser:false},
      to: { value: 220, type: 'gram' ,fromUser:false},
      price: { value: 220, type: 'USD' ,fromUser:false}
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
