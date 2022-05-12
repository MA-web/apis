import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';
@Component({
  selector: 'app-supplier-add-product',
  templateUrl: './supplier-add-product.component.html',
  styleUrls: ['./supplier-add-product.component.scss']
})
export class SupplierAddProductComponent extends AppBaseComponent implements OnInit {

  productCertificates: any = []

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
                  type: 'input',
                  label: this._translateService.instant('Purity'),
                  required: true,
                  placeholder: '%'
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
          /*****************************KeySpecification************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('KeySpecification'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'RelatedSubstances',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('RelatedSubstances'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Residue_on_ignition',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Residue_on_ignition'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'HeavyMetal',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('HeavyMetal'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ValidPeriod',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('ValidPeriod'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'MeltingRange',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('MeltingRange'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Loss_on_drying',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Loss_on_drying'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'PH',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('PH'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ResidualSolvents',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('ResidualSolvents'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'From',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('From'),
                },
              },
              {
                className: 'col-md-6 col-12 mt-4',
                key: 'Micronization',
                type: 'checkbox',
                defaultValue: false,
                templateOptions: {
                  label: this._translateService.instant('Micronization'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ParticleSizeD90',
                type: 'select',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('ParticleSizeD90'),
                  required: true
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.Micronization,
                },
              },
              {
                className: 'col-12',
                key: 'OpticalRotation',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('OpticalRotation'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'DissolutionRate',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('DissolutionRate'),
                  labelHint: '(hr/% Percentage) + ( * Minimum one )',
                  required: true,
                  placeholder: '%'
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'hour',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('hour'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Total_viable_aerobic_Count',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Total_viable_aerobic_Count'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Total_yeast_and_mould_count',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Total_yeast_and_mould_count'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'EscherichiaColi',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('EscherichiaColi'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SalmonellaSpecies',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('SalmonellaSpecies'),
                },
              },
              {
                className: 'col-md-6 col-12 mt-4',
                key: 'Injection',
                type: 'checkbox',
                defaultValue: false,
                templateOptions: {
                  label: this._translateService.instant('Injection'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'endotoxinTest',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('endotoxinTest'),
                  required: true
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.Injection,
                },
              },
            ],
          },
          /*****************************InsertProductCertificates************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('InsertProductCertificates'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row align-items-center',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'CertificateName',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('CertificateName'),
                  required: true,
                  options: [
                    { label: "c1", value: "c1" },
                    { label: "c2", value: "c2" }
                  ]
                },
              },
              {
                className: 'col-md-3 col-12 p-0 mt-md-3',
                key: 'UploadProductCertificate',
                type: 'file',
                templateOptions: {
                  label: this._translateService.instant('UploadCertificate'),
                  required: true,
                  change: (filed, $event) => {

                    let file = $event.target.files
                    let fileToUpload: any;
                    fileToUpload = file.item(0);
                    let reader = new FileReader();
                    reader.onload = (event: any) => {
                      this.model.UploadProductCertificate = { src: event.target.result, fileToUpload: fileToUpload }
                    }
                    reader.readAsDataURL(fileToUpload);
                  }
                },
              },
              {
                className: 'col-md-2 col-12',
                type: 'button',
                templateOptions: {
                  icon: 'add.svg',
                  btnType: 'success px-3 mt-md-4',
                  onClick: ($event: any) => {
                    this.productCertificates.push({ CertificateName: this.model?.CertificateName, file: this.model.UploadProductCertificate })
                    console.log('  this.productCertificates: ', this.productCertificates);

                    this.form.get('CertificateName')?.setValue(undefined)
                    this.form.get('CertificateName')?.reset()
                    this.form.get('UploadProductCertificate')?.setValue(undefined)

                  },
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.CertificateName || !this.model.UploadProductCertificate,
                },
              },

              {
                className: 'col-12',
                key: 'uploadAreaProducts',
                type: 'uploadArea',
                templateOptions: {
                  items: this.productCertificates
                },
              },
            ],
          },
          /*****************************InsertTradeInformation************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('InsertTradeInformation'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'MinimumOrderQuantity',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('MinimumOrderQuantity'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Unit',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Unit'),
                  options: []
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
                key: 'ValidPeriod',
                type: 'input',
                templateOptions: {
                  type:'date',
                  label: this._translateService.instant('ValidPeriod'),
                },
              },
            ],
          },
          /*****************************InsertProductPrice************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('InsertProductPrice'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-3 col-12',
                key: 'from',
                type: 'input',
                templateOptions: {
                  type:'number',
                  label: this._translateService.instant('From'),
                  required: true,
                },
              },
              {
                className: 'col-md-3 col-12',
                key: 'to',
                type: 'input',
                templateOptions: {
                  type:'number',
                  label: this._translateService.instant('To'),
                  required: true,
                },
              },
              {
                className: 'col-md-3 col-12',
                key: 'price',
                type: 'input',
                templateOptions: {
                  type:'number',
                  label: this._translateService.instant('Price'),
                  required: true,
                },
              },
              {
                className: 'col-md-2 col-12',
                type: 'button',
                templateOptions: {
                  icon: 'add.svg',
                  btnType: 'success px-3 mt-md-4',
                  onClick: ($event: any) => {
                    this.productCertificates.push({ CertificateName: this.model?.CertificateName, file: this.model.UploadProductCertificate })
                    console.log('  this.productCertificates: ', this.productCertificates);

                    this.form.get('CertificateName')?.setValue(undefined)
                    this.form.get('CertificateName')?.reset()
                    this.form.get('UploadProductCertificate')?.setValue(undefined)

                  },
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.CertificateName || !this.model.UploadProductCertificate,
                },
              },
            ],
          },
          /*****************************AllowedSample************************************* */


          /*****************************ProductShipping************************************* */

          /*****************************ShippingCertificate************************************* */

          /*****************************InsertSupplement************************************* */


        ],
      }
    ]
  }
  onSubmit() {


  }
}
