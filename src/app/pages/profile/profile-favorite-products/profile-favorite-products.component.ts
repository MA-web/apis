import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-profile-favorite-products',
  templateUrl: './profile-favorite-products.component.html',
  styleUrls: ['./profile-favorite-products.component.scss']
})
export class ProfileFavoriteProductsComponent extends AppBaseComponent implements OnInit {


  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList,active: true  }
    ]

      this.fields = [
        {
          className: 'col-12',
          key: 'firstName',
          type: 'input',
          templateOptions: {
            placeholder: this._translateService.instant('Search_product_profile')
          }
        },
        {
          className: 'col-12 mb-2',
          template: `<span class="mb-0 font-weight-bold main-color">${this._translateService.instant('FilterBy')}:</span>`,
        },
        {
          className: 'col-md-4 col-12',
          key: 'category',
          type: 'ng-select',
          templateOptions: {
            placeholder: this._translateService.instant('category'),
            options: []
          }
        },
        {
          className: 'col-md-4 col-12',
          key: 'SubCategory',
          type: 'ng-select',
          templateOptions: {
            placeholder: this._translateService.instant('SubCategory'),
            options: []
          }
        },
        {
          className: 'col-md-4 col-12',
          key: 'origin',
          type: 'ng-select',
          templateOptions: {
            placeholder: this._translateService.instant('origin'),
            options: []
          }
        },

      ]





  }

  onTogglingView(type:string){
    const filterGridRows = document.querySelectorAll('.filter-grid-row>div'); // all

    if(type === 'list'){
      filterGridRows.forEach(element => {
        element.classList.remove('col-sm-6')
        element.classList.add('col-12');
      });
    }else{
      filterGridRows.forEach(element => {
        element.classList.remove('col-12');
        element.classList.add('col-sm-6')
      });
    }
  }

  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
