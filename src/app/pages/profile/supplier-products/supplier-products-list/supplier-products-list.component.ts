import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-supplier-products-list',
  templateUrl: './supplier-products-list.component.html',
  styleUrls: ['./supplier-products-list.component.scss']
})
export class SupplierProductsListComponent extends AppBaseComponent implements OnInit {

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('MyProducts'), active: true },
    ]
    this.fields = [
      {
        className:'col-12',
        key: 'firstName',
        type: 'input',
        templateOptions: {
          placeholder: this._translateService.instant('Search_product_profile')
        }
      },
      {
        className:'col-12 mb-2',
        template: `<span class="mb-0 font-weight-bold main-color">${this._translateService.instant('FilterBy')}:</span>`,
      },
      {
        className:'col-md-4 col-12',
        key: 'category',
        type: 'select',
        templateOptions: {
          placeholder: this._translateService.instant('category'),
          options:[]
        }
      },
      {
        className:'col-md-4 col-12',
        key: 'SubCategory',
        type: 'select',
        templateOptions: {
          placeholder: this._translateService.instant('SubCategory'),
          options:[]
        }
      },
      {
        className:'col-md-4 col-12',
        key: 'status',
        type: 'select',
        templateOptions: {
          placeholder: this._translateService.instant('status'),
          options:[]
        }
      },
    ]


  }




  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
