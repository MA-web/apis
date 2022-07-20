import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { OurSuppliersDto, OurSuppliersSupplierDto, SupplierControllerService } from 'src/app/@api';
import { finalize, forkJoin } from 'rxjs';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-our-suppliers-list',
  templateUrl: './our-suppliers-list.component.html',
  styleUrls: ['./our-suppliers-list.component.scss'],
})
export class OurSuppliersListComponent extends AppBaseComponent implements OnInit, OnDestroy{

  listArr :Array<OurSuppliersSupplierDto> = []
  constructor(
    Injector: Injector,
    private SupplierControllerService:SupplierControllerService
  ) {
    super(Injector)
    this.isLoadingForm = true
  }
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    let observables = [
      this.LookupControllerService.getItemSampleTypesUsingGET(),
      this.LookupControllerService.getSuppliersCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
      this.LookupControllerService.getItemCerTypeUsingGET()
    ]
    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.fields = [
        {
          className: 'search-icon-parent col-lg-12 col-sm-6 col-12',
          key: 'FilterByName',
          type: 'input',
          templateOptions: {
            label: this._translateService.instant('Filter by Name'),
            placeholder: 'Type the company, product',
          },
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'sample',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('sample'),
            options: res[0]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId })),
          },
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'supplierType',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('supplierType'),
            options: res[1]?.map(v => ({ label: v?.categoryDescription, value: v?.categoryId })),
          },
        },
        {
          className: 'col-lg-12 col-sm-6 col-12',
          key: 'origin',
          type: 'ng-select',
          templateOptions: {
            label: this._translateService.instant('origin'),
            options: res[2]?.map(v => ({ label: v?.originName, value: v?.originId })),
          },
        },
        {
          className:'col-lg-12 col-sm-6 col-12',
          key: 'certificates',
          type: 'ng-select',
          templateOptions: {
            multiple:true,
            label: this._translateService.instant('certificates'),
            options: res[3]?.map(v => ({ label: v?.certificateTypeName, value: v?.certificateTypeId })),
          }
        },


      ];
      this.isLoadingForm = false
    })

    this.getList()
  }

  getList() {
    this.isLoading = true
    let observable;

      observable = this.SupplierControllerService.getOurSuppliersUsingGET(this.model?.certificates, this.model?.origin ,this.model?.sample ,this.pageNumber, this.pageSize,this.model?.FilterByName,this.model?.supplierType)

    const sub = observable.pipe(finalize(() => {
      this.isLoading = false
    })).subscribe((res: OurSuppliersDto) => {
      if (res) {
        this.listArr = res.suppliers.content;
        this.totalElements = res.suppliers.totalElements
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getList()
  }
  onSubmit() {
    this.getList()
  }

  reset(){
    this.form.reset();
    this.options.resetModel()
    this.getList()
  }
}
