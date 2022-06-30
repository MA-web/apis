import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { forkJoin } from 'rxjs';
import { DealControllerService, DealDto, PageDealDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-deals-list',
  templateUrl: './profile-deals-list.component.html',
  styleUrls: ['./profile-deals-list.component.scss']
})
export class ProfileDealsListComponent extends AppBaseComponent implements OnInit {
  listArr: Array<DealDto> = []
  dealTypeInProgress: number = 0;
  dealTypeInDone: number = 0;
  constructor(
    injector: Injector,
    private DealControllerService: DealControllerService
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      switch (param['type']) {
        case 'inquiries':
          this.dealTypeInProgress = 0;
          this.dealTypeInDone = 7
          break;
        case 'quotations':
          this.dealTypeInProgress = 1;
          this.dealTypeInDone = 8
          break;
        case 'orders':
          this.dealTypeInProgress = 3;
          this.dealTypeInDone = 9
          break;
        case 'invoices':
          this.dealTypeInProgress = 2;
          this.dealTypeInDone = 4
          break;
        case 'drafts':
          this.dealTypeInProgress = 6;
          break;
        default:
          break;
      }
      this.getList()

    })
  }

  async ngOnInit() {
    this.LookupControllerService.getDealStepTypesUsingGET().subscribe(res => {
      console.log('res: ', res);

    })
    this.LookupControllerService.getDealStatuesMapUsingGET().subscribe(res => {
      console.log('res: ', res);

    })
    this.LookupControllerService.getInquiryStatuesMapUsingGET().subscribe(res => {
      console.log('res: ', res);

    })
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.route.url.subscribe((url: any) => {
      this.breadcrumbItems = [
        { label: this._translateService.instant('Deals') },
        { label: this._translateService.instant(url[0]?.path), active: true },
      ]
    })

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
        key: 'status',
        type: 'ng-select',
        templateOptions: {
          placeholder: this._translateService.instant('status'),
          options: []
        }
      },
    ]

  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getList()
  }

  getList() {
    this.isLoading = true
    let observable = [];
    if (this.userData?.role === roles?.customer) {
      if(this.dealTypeInProgress ===0 ||this.dealTypeInProgress ){
        observable.push(this.DealControllerService.getDealsForCustomerUsingGET(this.dealTypeInProgress, this.pageNumber, this.pageSize))
      }
      if(this.dealTypeInDone){
        observable.push(this.DealControllerService.getDealsForCustomerUsingGET(this.dealTypeInDone, this.pageNumber, this.pageSize))
      }

    } else {
      if(this.dealTypeInProgress ===0 ||this.dealTypeInProgress ){
        observable.push(this.DealControllerService.getDealsForSupplierUsingGET(this.dealTypeInProgress, this.pageNumber, this.pageSize))
      }
      if(this.dealTypeInDone){
        observable.push(this.DealControllerService.getDealsForSupplierUsingGET(this.dealTypeInDone, this.pageNumber, this.pageSize))
      }
    
    }
    const Sub = forkJoin(observable).subscribe((res: any) => {
    
      if (res.length>0) {
        if(res[0]){
          this.listArr = res[0].content
          this.totalElements = res[0].totalElements;
        }
        if(res[1]){
          this.listArr = [...this.listArr,  ...res[1].content]
          this.totalElements =  this.totalElements + res[1].totalElements;
        }
      
        this.isLoading = false
      }
    })
    this.unSubscription.push(Sub)
  }


  onSubmit() {



  }
}
