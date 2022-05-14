import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-deal-card',
  templateUrl: './profile-deal-card.component.html',
  styleUrls: ['./profile-deal-card.component.scss']
})
export class ProfileDealCardComponent implements OnInit {

  @Input() status:string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
