import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { LabelType } from "@angular-slider/ngx-slider";
import { appRouts } from 'src/environments/environment';
import { ItemCategoryDto, ItemControllerService, ItemDto, ItemSearchFilter, PageItemDto, PublicDataControllerService } from 'src/app/@api';
import { finalize, forkJoin } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { FormlyForm } from '@ngx-formly/core';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @ViewChild("formlyForm") formlyForm: FormlyForm;
  products: Array<ItemDto> = [];
  SearchCategory: ItemCategoryDto = {};
  ItemCategory: Array<ItemCategoryDto> = []

  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    private _publicDataControllerService: PublicDataControllerService,
  ) {
    super(injector)
    this.isLoadingForm = true
  }

  async  ngOnInit() {

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList, active: true }
    ]
    const qSub = this.route.queryParams.subscribe(query => {
     if( Object.keys(query).length){
      this.searchResult = { category: JSON?.parse(query?.category), searchKey: query?.searchKey }
      this.form.get('itemName')?.setValue(this.searchResult?.searchKey)
      this.form.get('itemCategoryId')?.setValue(this.searchResult?.category?.categoryId)
     }
     this.getInitProduct()

    })
    this.unSubscription.push(qSub);
    let observables = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getSuppliersCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
      this.LookupControllerService.getItemSampleTypesUsingGET(),
    ]
    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.ItemCategory = res[0]
      this.isLoadingForm = false
      this.fields = [
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'itemName',
          type: 'input',
          templateOptions: {
            label: this._translateService.instant('name'),
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'itemCategoryId',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('category'),
            options: res[0]?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
            change: (filed, $event) => {
              this.fields[2].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
            },
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'itemSubcategoryId',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('SubCategory'),
            options: []
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'supplierTypeId',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('SupplierType'),
            options: res[1]?.map(v => ({ label: v?.categoryDescription, value: v?.categoryId })),
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'caseNumber',
          type: 'input',
          templateOptions: {
            label: this._translateService.instant('casNo'),
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'originId',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('origin'),
            options: res[2]?.map(v => ({ label: v?.originName, value: v?.originId })),
          }
        },
        {
          className: 'col-12',
          key: 'purity',
          type: 'slider',
          templateOptions: {
            label: this._translateService.instant('Purity'),
            sliderOptions: {
              floor: 0,
              ceil: 100,
            }
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'injection',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('injectionGrad')
          }
        },
        // {
        //   className: 'col-lg-12 col-sm-6 col-12',
        //   key: 'pellets',
        //   type: 'checkbox',
        //   defaultValue: false,
        //   templateOptions: {
        //     label: this._translateService.instant('pellets')
        //   }
        // },
        {
          className: 'col-12',
          key: 'particleSize',
          type: 'slider',
          templateOptions: {
            label: this._translateService.instant('ParticleSizeD90'),
            sliderOptions: {
              floor: 0,
              ceil: 1000,
            }
          }
        },
        {
          className: 'col-12 mb-0',
          template: `<div class="form-group mb-0"><label>${this._translateService.instant('certificates')}</label></div>`,
        },
        {
          className: 'col-md-6 col-12',
          key: 'coa',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('COA'),
          }
        },
        {
          className: 'col-md-6 col-12',
          key: 'dmf',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('DMF'),
          }
        },
        {
          className: 'col-md-6 col-12',
          key: 'gmpCertificate',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('GMP'),
          }
        },
        {
          className: 'col-md-6 col-12',
          key: 'halal',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('Halal'),
          }
        },
        {
          className: 'col-md-6 col-12',
          key: 'iso',
          type: 'checkbox',
          defaultValue: false,
          templateOptions: {
            label: this._translateService.instant('ISO'),
          }
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'itemSampleTypesId',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('sampleType'),
            options: res[3]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId })),
          }
        },
      ]
      this.model.itemName = this.searchResult?.searchKey;
      this.model.itemCategoryId = this.searchResult?.category?.categoryId;
      if (this.searchResult?.category?.categoryId) {
        this.fields[2].templateOptions.options = this.ItemCategory?.find(v => this.searchResult?.category?.categoryId === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
      }
    })
    this.unSubscription.push(forkSub);

    this._sharedService.resetSearch.next(true)
  }

  getInitProduct() {
    this.isLoading = true
    let observable;
    if (!this._sharedService.checkToken()) {
      observable = this._publicDataControllerService.searchForItemsUsingGET1(this.searchResult.category?.categoryName, this.pageNumber, this.searchResult.searchKey, this.pageSize)
    } else {
      observable = this._itemControllerService.searchForItemsUsingGET(this.searchResult.category?.categoryName, this.pageNumber, this.searchResult.searchKey, this.pageSize)
    }
    const sub = observable.pipe(finalize(() => {
      this.isLoading = false
    })).subscribe((res: PageItemDto) => {
      if (res) {
        this.products = res.content;
        this.totalElements = res.totalElements
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.filterProducts()
  }

  filterProducts() {
    this.isLoading = true
    let observable;
    let filter: ItemSearchFilter = {
      caseNumber: this.model?.caseNumber,
      injection: this.model?.injection,
      itemCategoryId: this.model?.itemCategoryId,
      itemName: this.model?.itemName,
      itemSampleTypesId: this.model?.itemSampleTypesId,
      itemSubcategoryId: this.model?.itemSubcategoryId,
      originId: this.model?.originId,
      particleSize: this.model?.particleSize[0],
      purity: this.model?.purity[0],
      supplierTypeId: this.model?.supplierTypeId,
    }
    let category: ItemCategoryDto = this.ItemCategory?.find(v => this.model?.itemCategoryId === v?.categoryId)
    this.router.navigate(['/products'], { queryParams: { category: JSON.stringify({ categoryId: category?.categoryId, categoryName: category?.categoryName }), searchKey: this.model.itemName, } })
    if (!this._sharedService.checkToken()) {
      observable = this._publicDataControllerService.filterItemsForUserUsingPOST1(filter, this.pageNumber, this.pageSize)
    } else {
      observable = this._itemControllerService.filterItemsForUserUsingPOST(filter, this.pageNumber, this.pageSize)
    }
    const sub = observable.pipe(finalize(() => {
      this.isLoading = false
    })).subscribe((res: PageItemDto) => {
      if (res) {
        this.products = res.content;
        this.totalElements = res.totalElements
      }
    })
    this.unSubscription.push(sub)
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

  onSubmit() {
    this.filterProducts()
  }
}
