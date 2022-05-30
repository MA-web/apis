import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent extends AppBaseComponent implements OnInit, OnDestroy {


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


  onSubmit() {
    console.log(this.form);
    console.log(this.model);
  }
}
