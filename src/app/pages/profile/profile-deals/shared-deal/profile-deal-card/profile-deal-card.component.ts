import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealDto } from 'src/app/@api';

@Component({
  selector: 'app-profile-deal-card',
  templateUrl: './profile-deal-card.component.html',
  styleUrls: ['./profile-deal-card.component.scss']
})
export class ProfileDealCardComponent implements OnInit {

  @Input() deal: DealDto;
  @Input() status: string = '';
  dealType: string = ''
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe((url: any) => {
      switch (url[0]?.path) {
        case 'inquiries':
          this.dealType = 'Inquiry'
          break;
        case 'quotations':
          this.dealType = 'Quotation'
          break;
        case 'orders':
          this.dealType = 'Order'
          break;
        case 'invoices':
          this.dealType = 'invoice'
          break;
        default:
          break;
      }
    })
  }

}
