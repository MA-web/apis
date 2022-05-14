import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-details',
  templateUrl: './profile-deal-details.component.html',
  styleUrls: ['./profile-deal-details.component.scss']
})
export class ProfileDealDetailsComponent extends AppBaseComponent implements OnInit {
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
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Deals')},
      { label: '#Invoice - 12666532', active: true },
    ]
  }

}
