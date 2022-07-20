import { Component, HostListener, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import {  ItemControllerService, ItemDto, PageItemDto, SupplierControllerService, SupplierDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { SendInboxComponent } from 'src/app/shared/components/send-inbox/send-inbox.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AppBaseComponent implements OnInit, OnDestroy {
  data: SupplierDto
  id: any;
  products: Array<ItemDto> = []
  isLoadingProducts = false;
  constructor(
    Injector: Injector,
    private SupplierControllerService:SupplierControllerService,
    private _itemControllerService: ItemControllerService,
    private modalService: BsModalService
  ) {
    super(Injector)
    this.route.params.subscribe(param => {
      this.id = param['id']
      this.getDetails()
      this.getSupplierProducts()
    })

  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('ourSuppliers'), path: appRouts.productsList },
      { label: 'Supplier Name', active: true }
    ]

    this.fields = [
      {
        className: 'col-12',
        key: 'messageContent',
        type: 'textarea',
        templateOptions: {
          placeholder: 'Type your message Here …..',
          rows:4
        },
      },
      {
        className: 'col-12',
        key: 'inboxImages',
        type: 'upload',
        templateOptions: {
          multiple:true,
        }
      },


    ];

  }
  innerWidth: number = window.innerWidth;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;

  }


  onTogglingView(type:string){
    const filterGridRows = document.querySelectorAll('.filter-grid-row>div'); // all

    if(type === 'list'){
      filterGridRows.forEach(element => {
        element.classList.remove('col-md-4')
        element.classList.add('col-12');
      });
    }else{
      filterGridRows.forEach(element => {
        element.classList.remove('col-12');
        element.classList.add('col-md-4')
      });
    }
  }

  getDetails() {
    this.isLoading = true;
    const getItemByItemIdUsingGETSub = this.SupplierControllerService.getSupplierDetailsUsingGET(this.id).subscribe((res: SupplierDto) => {
      if (res) {
        this.data = res;
        this.breadcrumbItems = [
          { label: this._translateService.instant('ourSuppliers'), path: appRouts.productsList },
          { label: this.data?.supplierName, active: true }
        ]
        this.isLoading = false;
      }
    })
    this.unSubscription.push(getItemByItemIdUsingGETSub)
  }

  onSend(){
    const initialState = {
      class: 'modal-md',
      initialState: {
        supplierId:this.data?.supplierId
      }
    };
    this.modalService.show(SendInboxComponent, initialState);

  }

  getSupplierProducts(){
    this.isLoadingProducts = true;
    const getItemByItemIdUsingGETSub = this._itemControllerService.getItemsForSupplierUsingGET(this.id,this.pageNumber,this.pageSize).subscribe((res: PageItemDto) => {
      if (res) {
        this.products = res.content;
        this.totalElements = res.totalElements
        this.isLoadingProducts = false;
      }
    })
    this.unSubscription.push(getItemByItemIdUsingGETSub)
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getSupplierProducts()
  }
  onSubmit() {

  }
}
