import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { forkJoin } from 'rxjs';
import { ItemCategoryDto, FaqControllerService, ItemDto, PageItemDto, PublicDataControllerService, PageFaqDto, FaqDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

// start from here
@Component({
  selector: 'app-faqs-list',
  templateUrl: './faqs-list.component.html',
  styleUrls: ['./faqs-list.component.scss']
})
export class FaqsListComponent extends AppBaseComponent implements OnInit , OnDestroy{
  ItemCategory: Array<ItemCategoryDto> = []
  faqs: Array<FaqDto> = [];

  status = []
  constructor(
    injector: Injector,
    private _faqControllerService: FaqControllerService,
    private _publicDataControllerService: PublicDataControllerService,
  ) {
    super(injector)
    this.isLoadingForm = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    let observables = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getItemStatuesMapUsingGET(),

    ]
    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.status = res[1]
      this.ItemCategory = res[0];
      this.isLoadingForm = false;
      let status = []
      for (var key in res[1]) {
        if (res[1]?.hasOwnProperty(key)) {
            status?.push({label: res[1][key], value:key})
        }
    }
    // faqEndDate?: Date, faqStartDate?: Date, page?: number, size?: number

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
            change: (filed, $faq) => {
              this.fields[3].templateOptions.options = this.ItemCategory?.find(v => $faq === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
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
          key: 'status',
          type: 'ng-select',
          templateOptions: {
            placeholder: this._translateService.instant('status'),
            options: status
          }
        },
      ]

    })


    this.getList()

    const sendRefreshSub = this._sharedService.sendRefresh.subscribe(res => {
      if (res) this.getList()
    })
    this.unSubscription.push(sendRefreshSub)  }

  getList() {
    this.isLoading = true

    // faqEndDate?: Date, faqStartDate?: Date, page?: number, size?: number
    // this._sharedService?.getToken(),
    const getFavSub = this._faqControllerService.getFaqsUsingGET(this.pageNumber,this.pageSize).subscribe((res: PageFaqDto) => {
      if (res) {
        this.isLoading = false
        this.faqs = res.content;
        this.totalElements = res.totalElements
      }
    })
    this.unSubscription.push(getFavSub)
  }
  pageChanged(faq: PageChangedEvent): void {
    this.pageNumber = faq.page - 1;
    this.getList()
  }
  onSubmit() {
    this.getList()

  }
}
