import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';
@Component({
  selector: 'app-supplier-add-product',
  templateUrl: './supplier-add-product.component.html',
  styleUrls: ['./supplier-add-product.component.scss']
})
export class SupplierAddProductComponent extends AppBaseComponent implements OnInit {


  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('ProductsAddition'), active: true },
    ]

    this.fields = [
      {
        type: 'accordion',
        fieldGroup: [
          /*****************************ChooseCategories************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ChooseCategories'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'category',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: []
                },
              },
            ],
          },
          /*****************************BasicInformation************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('BasicInformation'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'ProductName',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('ProductName'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'casNo',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('casNo'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'MolecularFormula',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('MolecularFormula'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'origin',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('origin'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SupplierType',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SupplierType'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-12',
                key: 'keywords',
                type: 'chips',
                defaultValue: ['Javascript', 'Typescript'],
                templateOptions: {
                  label: this._translateService.instant('keywords'),
                  requestAutocompleteItemsFake: ['item1', 'item2', 'item3']
                },
              },
              {
                className: 'col-12',
                key: 'ProductPicture',
                type: 'upload',
                templateOptions: {
                  label: this._translateService.instant('ProductPicture'),
                }
              },
              {
                className: 'col-12',
                key: 'ProductDetails',
                type: 'textarea',
                templateOptions: {
                  label: this._translateService.instant('ProductDetails'),
                  rows: 5
                },
              },
            ],
          },


          /*****************************ProductAttribute************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductAttribute'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'Purity',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Purity'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Appearance',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Appearance'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Storage',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Storage'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Application',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Application'),
                  required: true,
                },
              },
            ],
          },


          /*****************************ProductAdvantage************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductAdvantage'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'Advantage',
                type: 'textarea',
                templateOptions: {
                  label: this._translateService.instant('Advantage'),
                  rows: 5
                },
              },
            ],
          },



          {
            templateOptions: {
              label: this._translateService.instant('ChooseCategories'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'category',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: []
                },
              },
            ],
          },



          {
            templateOptions: {
              label: this._translateService.instant('ChooseCategories'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'category',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: []
                },
              },
            ],
          },



          {
            templateOptions: {
              label: this._translateService.instant('ChooseCategories'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'category',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: []
                },
              },
            ],
          },


          {
            templateOptions: {
              label: this._translateService.instant('ChooseCategories'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'category',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: []
                },
              },
            ],
          },

        ],
      }

    ]


  }




  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
