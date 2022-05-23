import { Component, Injector, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { forkJoin } from 'rxjs';
import { FavoriteItemDto, ItemCategoryDto, UserControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-profile-favorite-products',
  templateUrl: './profile-favorite-products.component.html',
  styleUrls: ['./profile-favorite-products.component.scss']
})
export class ProfileFavoriteProductsComponent extends AppBaseComponent implements OnInit {
  favProducts: Array<FavoriteItemDto> = [];
  ItemCategory: Array<ItemCategoryDto> = []
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
  ) {
    super(injector)
    this.isLoading = true;
    this.isLoadingForm = true;
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList, active: true }
    ]

    this.getList()

    let observables = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
    ]
    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.ItemCategory = res[0];
      this.isLoadingForm = false;
      this.fields = [
        {
          className: 'col-12',
          key: 'searchValue',
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
            options: res[0]?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
            change: (filed, $event) => {
              this.fields[3].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
            },
          }
        },
        {
          className: 'col-md-4 col-12',
          key: 'subCategory',
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
            options: res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
          }
        },

      ]
    })




    const sendRefreshSub = this._sharedService.sendRefresh.subscribe(res => {
      if (res) this.getList()
    })
    this.unSubscription.push(sendRefreshSub)


  }

  getList() {
    this.isLoading = true
    const getFavSub = this._userControllerService.getFavouriteItemsUsingGET(this.pageNumber,this.model?.searchValue,this.pageSize).pipe(

    ).subscribe((res: Array<FavoriteItemDto>) => {
     if(res){
      this.favProducts = res
      this.isLoading = false
     }
    })
    this.unSubscription.push(getFavSub)
  }
  onTogglingView(type: string) {
    const filterGridRows = document.querySelectorAll('.filter-grid-row>div'); // all

    if (type === 'list') {
      filterGridRows.forEach(element => {
        element.classList.remove('col-sm-6')
        element.classList.add('col-12');
      });
    } else {
      filterGridRows.forEach(element => {
        element.classList.remove('col-12');
        element.classList.add('col-sm-6')
      });
    }
  }


  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getList()
  }


  onSubmit() {
    this.getList()
  }
}
