import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { Options, LabelType } from "@angular-slider/ngx-slider";
import { response } from 'express';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends AppBaseComponent implements OnInit {


  async ngOnInit(){
    this.breadcrumbItems = [
      { label: this._translateService.instant('Products'), path: appRouts.productsList,active: true  }
    ]

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'name',
        type: 'input',
        templateOptions: {
          label: this._translateService.instant('name')
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'category',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('category'),
          options:[
            {label:'nn', value:'dd'}
          ]
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'subCategory',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('subCategory'),
          options:[]
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'supplierType',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('supplierType'),
          options:[]
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'casNo',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('casNo'),
          options:[]
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'Origin',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('origin'),
          options:[]
        }
      },
      {
        className:'col-12',
        key: 'Purity',
        type: 'slider',
        defaultValue:[100,300],
        templateOptions: {
          label: this._translateService.instant('Purity'),
          sliderOptions : {
            floor: 0,
            ceil: 500,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return "Min " + value;
                case LabelType.High:
                  return "Max " + value;
                default:
                  return "" + value;
              }
            }
          }
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'injectionGrad',
        type: 'checkbox',
        defaultValue:false,
        templateOptions: {
          label: this._translateService.instant('injectionGrad')
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'pellets',
        type: 'checkbox',
        defaultValue:false,
        templateOptions: {
          label: this._translateService.instant('pellets')
        }
      },
      {
        className:'col-12',
        key: 'ParticleSizeD90',
        type: 'slider',
        defaultValue:[100,900],
        templateOptions: {
          label: this._translateService.instant('ParticleSizeD90'),
          sliderOptions : {
            floor: 0,
            ceil: 1000,
            translate: (value: number, label: LabelType): string => {
              switch (label) {
                case LabelType.Low:
                  return "Min " + value;
                case LabelType.High:
                  return "Max " + value;
                default:
                  return "" + value;
              }
            }
          }
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'certificates',
        type: 'select',
        templateOptions: {
          multiple:true,
          label: this._translateService.instant('certificates'),
          options:[]
        }
      },
      {
        className:'col-lg-12 col-sm-6 col-12',
        key: 'sampleType',
        type: 'select',
        templateOptions: {
          label: this._translateService.instant('sampleType'),
          options:[]
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
