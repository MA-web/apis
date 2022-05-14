import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-supplier-products-details',
  templateUrl: './supplier-products-details.component.html',
  styleUrls: ['./supplier-products-details.component.scss']
})
export class SupplierProductsDetailsComponent extends AppBaseComponent implements OnInit {
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
