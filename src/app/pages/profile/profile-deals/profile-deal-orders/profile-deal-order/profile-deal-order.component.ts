import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-deal-order',
  templateUrl: './profile-deal-order.component.html',
  styleUrls: ['./profile-deal-order.component.scss']
})
export class ProfileDealOrderComponent implements OnInit {
  @Input() userType :string = ''
  @Input() isOpen :boolean = false
  @Input() title:string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
