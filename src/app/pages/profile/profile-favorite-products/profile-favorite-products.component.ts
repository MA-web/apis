import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { forkJoin } from 'rxjs';
import {  ItemCategoryDto, ItemDto, PageItemDto, UserControllerService } from 'src/app/@api';
import { SupplierEmployeeControllerService } from 'src/app/@api/api/supplierEmployeeController.service';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts, roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-favorite-products',
  templateUrl: './profile-favorite-products.component.html',
  styleUrls: ['./profile-favorite-products.component.scss']
})
export class ProfileFavoriteProductsComponent extends AppBaseComponent implements OnInit , OnDestroy{
  favProducts: Array<ItemDto> = [];
  ItemCategory: Array<ItemCategoryDto> = []
  constructor(
    injector: Injector,
    private _userControllerService: UserControllerService,
    private _supplierEmployeeControllerService:SupplierEmployeeControllerService
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
    let obs
    if(this.userData?.role === roles.customer){
      obs = this._userControllerService.getFavouriteItemsUsingGET(this.model?.category,this.model?.searchValue,this.model?.subCategory, this.model?.origin,this.pageNumber,this.pageSize)
    }else{
      obs = this._supplierEmployeeControllerService.getFavouriteItemsUsingGET(this.model?.category,this.model?.searchValue,this.model?.subCategory, this.model?.origin,this.pageNumber,this.pageSize)

    }
    const getFavSub = obs.pipe(

    ).subscribe((res: PageItemDto) => {
     if(res){
      this.favProducts = res?.content
      this.totalElements = res.totalElements
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
