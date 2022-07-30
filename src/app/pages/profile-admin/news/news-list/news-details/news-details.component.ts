import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent extends AppBaseComponent implements OnInit, OnDestroy {
  prices = [
    {
      from: { value: 120, type: 'gram' },
      to: { value: 220, type: 'gram' },
      price: { value: 220, type: 'USD' }
    },
    {
      from: { value: 120, type: 'gram' },
      to: { value: 220, type: 'gram' },
      price: { value: 220, type: 'USD' }
    }
  ]
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('ProductsAdditionView'), active: true },
    ]
  }

}
