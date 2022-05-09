import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { Options, LabelType } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-our-suppliers-list',
  templateUrl: './our-suppliers-list.component.html',
  styleUrls: ['./our-suppliers-list.component.scss'],
})
export class OurSuppliersListComponent
  extends AppBaseComponent
  implements OnInit
{
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className: 'search-icon-parent col-lg-12 col-sm-6 col-12',
        key: 'FilterByname',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('Filter by Name'),
          placeholder: 'Type the company, product',
          // icon: 'search.svg',

        },
      },
      {
        className: 'col-lg-12 col-sm-6 col-12',
        key: 'sample',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('sample'),
          options: [],
        },
      },
      {
        className: 'col-lg-12 col-sm-6 col-12',
        key: 'supplierType',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('supplierType'),
          options: [],
        },
      },
      {
        className: 'col-lg-12 col-sm-6 col-12',
        key: 'orgin',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('orgin'),
          options: [],
        },
      },
      {
        template: '<span class="col-lg-12 col-sm-6 col-12 text-secondary">Certificates</span>',
      },

      {
        className: 'text-secondary col-lg-12 col-sm-6 col-12 ',
        key: 'certificate01330',
        type: 'checkbox',
        defaultValue: false,
        templateOptions: {
          label: this._translateService.instant('certificate01330'),
        },
      },


    ];
  }
  onSubmit() {
    console.log(this.form);
    console.log(this.model);
  }
}
