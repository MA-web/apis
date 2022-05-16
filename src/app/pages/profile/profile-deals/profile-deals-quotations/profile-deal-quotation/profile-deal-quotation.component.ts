import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-deal-quotation',
  templateUrl: './profile-deal-quotation.component.html',
  styleUrls: ['./profile-deal-quotation.component.scss']
})
export class ProfileDealQuotationComponent implements OnInit {
  @Input() userType :string = ''
  @Input() isOpen :boolean = false
  @Input() title:string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
