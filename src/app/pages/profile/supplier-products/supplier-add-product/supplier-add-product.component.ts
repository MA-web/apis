import { Component, Injector, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ItemCategoryDto, ItemControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
@Component({
  selector: 'app-supplier-add-product',
  templateUrl: './supplier-add-product.component.html',
  styleUrls: ['./supplier-add-product.component.scss']
})
export class SupplierAddProductComponent extends AppBaseComponent implements OnInit {
  productCertificates: any[] = []

  ShippingCertificate: any[] = []
  ItemCategory: Array<ItemCategoryDto> = []
  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    ) {
    super(injector)
    this.isLoadingForm = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('ProductsAddition'), active: true },
    ]

    let observables = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
      this.LookupControllerService.getSuppliersCategoryUsingGET(),
      this.LookupControllerService.getUnitOfMeasureUsingGET(),
      this.LookupControllerService.getCurrenciesUsingGET(),
      this.LookupControllerService.getItemSampleTypesUsingGET(),
      this.LookupControllerService.getAllIncotermsUsingGET(),
      this.LookupControllerService.gettranspTransportationDtosUsingGET(),
    ]
    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.ItemCategory = res[0]
      this.isLoadingForm = false
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
                  key: 'itemCategory',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('category'),
                    required: true,
                    options: res[0]?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
                    change: (filed, $event) => {
                      this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
                    },
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'itemSubcategory',
                  type: 'ng-select',
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
                  key: 'itemName',
                  type: 'input',
                  defaultValue:'',
                  templateOptions: {
                    label: this._translateService.instant('ProductName'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'caseNumber',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('casNo'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'molFormula',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('MolecularFormula'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'origin',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('origin'),
                    required: true,
                    options:res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'supplierCategory',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('SupplierType'),
                    required: true,
                    options:res[2]?.map(v => ({ label: v?.categoryDescription, value: v?.categoryId })),
                  },
                },
                {
                  className: 'col-12',
                  key: 'itemKeywords',
                  type: 'chips',
                  templateOptions: {
                    label: this._translateService.instant('keywords'),
                  },
                },
                {
                  className: 'col-12',
                  key: 'attachment',
                  type: 'upload',
                  templateOptions: {
                    label: this._translateService.instant('ProductPicture'),
                  }
                },
                {
                  className: 'col-12',
                  key: 'details',
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
                  key: 'purity',
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
                  key: 'appearence',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Appearance'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'storage',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Storage'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'application',
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
                  key: 'advantage',
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
                  key: 'relatedSubstance',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('RelatedSubstances'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'residueIgnition',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Residue_on_ignition'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'heavyMetal',
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
                  key: 'meltingRange',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('MeltingRange'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'lossOnDrying',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('Loss_on_drying'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ph',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('PH'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'residualSolvents',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('ResidualSolvents'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'form',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('From'),
                  },
                },
                {
                  className: 'col-md-6 col-12 mt-4',
                  key: 'micronization',
                  type: 'checkbox',
                  defaultValue: false,
                  templateOptions: {
                    label: this._translateService.instant('Micronization'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'particleSize',
                  type: 'ng-select',
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
                  key: 'opticalRotation',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('OpticalRotation'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'dissolutionRate',
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
                  key: 'totalVac',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('Total_viable_aerobic_Count'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'totalYamc',
                  type: 'input',
                  templateOptions: {
                    type: 'number',
                    label: this._translateService.instant('Total_yeast_and_mould_count'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'escherichiaColi',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('EscherichiaColi'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'salmonelaSpecies',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('SalmonellaSpecies'),
                  },
                },
                {
                  className: 'col-md-6 col-12 mt-4',
                  key: 'injection',
                  type: 'checkbox',
                  defaultValue: false,
                  templateOptions: {
                    label: this._translateService.instant('Injection'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'indotoxinTest',
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
            /*****************************ProductCertificates************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ProductCertificates'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row align-items-center',
              fieldGroup: [
                {
                  className: 'col-md-6 col-12',
                  key: 'CertificateName',
                  type: 'ng-select',
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
                  className: 'col-md-3 col-12 p-0 mt-md-4',
                  key: 'UploadProductCertificate',
                  type: 'file',
                  templateOptions: {
                    text: this._translateService.instant('UploadCertificate'),
                    required: true,
                    change: (filed, $event) => {
                      console.log('$event: ', $event);
                      console.log(this.model.UploadProductCertificate);
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
                      this.model.uploadAreaProducts = this.productCertificates
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
            /*****************************TradeInformation************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('TradeInformation'),
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-md-6 col-12',
                  key: 'minOrderQuantity',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('MinimumOrderQuantity'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'Unit',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: []
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'InsertTradeInformationStorage',
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
                    type: 'date',
                    label: this._translateService.instant('ValidPeriod'),
                  },
                },
              ],
            },
            /*****************************ProductPrice************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ProductPrice'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  type: 'repeat',
                  key: 'productPrices',
                  templateOptions: {
                    columns: ['from', 'to', 'price'],
                    columnLevel: true,
                    textAdd: this._translateService.instant('Price'),
                  },
                  fieldArray: {
                    fieldGroupClassName: 'row mr-2',
                    fieldGroup: [
                      {
                        className: 'col-md-3 col-12  px-2',
                        key: 'from',
                        templateOptions: { label: this._translateService.instant('From'), },
                        wrappers: ['panel'],
                        fieldGroup: [
                          {

                            key: 'value',
                            type: 'input',
                            templateOptions: {
                              type: 'number',
                              required: true,
                            },
                          },
                          {

                            key: 'type',
                            type: 'ng-select',
                            templateOptions: {
                              required: true,
                              options:res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                            }
                          },
                        ],
                      },
                      {
                        className: 'col-md-3 col-12 p-0 pr-2',
                        key: 'to',
                        templateOptions: { label: this._translateService.instant('To'), },
                        wrappers: ['panel'],
                        fieldGroup: [
                          {

                            key: 'value',
                            type: 'input',
                            templateOptions: {
                              type: 'number',
                              required: true,
                            },
                          },
                          {
                            key: 'type',
                            type: 'ng-select',
                            templateOptions: {
                              required: true,
                              options:res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                            },
                          },
                        ],
                      },
                      {
                        className: 'col-md-3 col-12 p-0 pr-2',
                        key: 'price',
                        templateOptions: { label: this._translateService.instant('Price'), },
                        wrappers: ['panel'],
                        fieldGroup: [
                          {

                            key: 'value',
                            type: 'input',
                            templateOptions: {
                              type: 'number',
                              required: true,
                            },
                          },
                          {

                            key: 'type',
                            type: 'ng-select',
                            templateOptions: {
                              required: true,
                              options:res[4]?.map(v => ({ label: v?.currencyCode, value: v?.currencyId })),
                            },
                          },
                        ],
                      },

                    ]
                  }
                },
                {
                  className: 'col-12',
                  key: 'paymentTerms',
                  type: 'ng-select',
                  templateOptions: {
                    required: true,
                    label: this._translateService.instant('PaymentTerms'),
                    options: []
                  },
                },
              ],
            },
            /*****************************AllowedSample************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('AllowedSample'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'AllowedSample',
                  type: 'checkbox',
                  defaultValue: false,
                  templateOptions: {
                    label: this._translateService.instant('AllowedSample'),
                  },
                },
                {
                  className: 'col-12 mb-3',
                  template: `<img src="./assets/icons/info.svg" class="m-1"> <span class="mb-0 hint">${this._translateService.instant('add_attribute')}:</span>`,
                },
                {
                  className: 'col-12',
                  key: 'itemSampleType',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('sampleType'),
                    required: true,
                    options:res[5]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId})),
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample ,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleSize',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('SampleSize'),
                    required: true,
                    options: []
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample ,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleUnit',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('SampleUnit'),
                    required: true,
                    options: []
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample ,
                  },
                },
              ],
            },

            /*****************************ProductShipping************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ProductShipping'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'portOfDispatching',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Port_of_Discharge')
                  },
                },
              ],
            },
            /*****************************ProductionCapacity************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ProductionCapacity'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'productionCapacity',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Value')
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ProductionCapacityUnit',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: []
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'Period',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Period'),
                    options: []
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'estimatedDeliveryLeadTime',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('EstimatedLeadTime')
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'packaging',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('Package')
                  },
                },
                {
                  className: 'col-12',
                  key: 'Shipping',
                  type: 'radio',
                  templateOptions: {
                    type: 'radio',
                    label: this._translateService.instant('Shipping'),
                    name: 'Shipping',
                    options: [{ value: 'CustomerEnd', key: 'CustomerEnd' }, { value: 'SupplierEnd', key: 'SupplierEnd' }]
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'Incoterms',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Incoterms'),
                    options:res[6]?.map(v => ({ label: v?.incotermShortName, value: v?.incotermId })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'transportation',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Transportation'),
                    options:res[7]?.map(v => ({ label: v?.transportationName, value: v?.transportationId })),
                  },
                },
              ],
            },

            /*****************************ShippingCertificate************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ShippingCertificate'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row align-items-center',
              fieldGroup: [
                {
                  className: 'col-md-6 col-12',
                  key: 'ShippingCertificateName',
                  type: 'ng-select',
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
                  className: 'col-md-3 col-12 p-0 mt-md-4',
                  key: 'itemCertificates',
                  type: 'file',
                  templateOptions: {
                    text: this._translateService.instant('UploadCertificate'),
                    required: true,
                    change: (filed, $event) => {

                      let file = $event.target.files
                      let fileToUpload: any;
                      fileToUpload = file.item(0);
                      let reader = new FileReader();
                      reader.onload = (event: any) => {
                        this.model.UploadShippingCertificate = { src: event.target.result, fileToUpload: fileToUpload }
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
                      this.ShippingCertificate.push({ CertificateName: this.model?.ShippingCertificateName, file: this.model.UploadShippingCertificate })

                      this.model.uploadAreaShipping = this.ShippingCertificate

                      this.form.get('ShippingCertificateName')?.setValue(undefined)
                      this.form.get('ShippingCertificateName')?.reset()
                      this.form.get('UploadShippingCertificate')?.setValue(undefined)

                    },
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.ShippingCertificateName || !this.model.UploadShippingCertificate,
                  },
                },

                {
                  className: 'col-12',
                  key: 'uploadAreaShipping',
                  type: 'uploadArea',
                  templateOptions: {
                    items: this.ShippingCertificate
                  },
                },
              ],
            },
            /*****************************Supplement************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('Supplement'),
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12 mb-3',
                  template: `<span class="mb-0 hint font-italic">${this._translateService.instant('InsertSupplementMessage')}</span>`,
                },
                {
                  className: 'col-12',
                  type: 'repeat',
                  key: 'itemSuppliments',
                  templateOptions: {
                    columns: ['Attribute', 'Value'],
                    columnLevel: false,
                    textAdd: this._translateService.instant('Insert'),
                  },
                  fieldArray: {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        className: 'col-md-4 col-12',
                        key: 'attributeName',
                        type: 'input',
                        templateOptions: {
                          label: this._translateService.instant('Attribute'),
                        },
                      },
                      {
                        className: 'col-md-4 col-12',
                        key: 'attributeValue',
                        type: 'input',
                        templateOptions: {
                          label: this._translateService.instant('Value'),
                        },
                      },
                    ]
                  }
                },

              ],
            },

          ],
        }
      ]

    })
    this.unSubscription.push(forkSub);
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
                key: 'itemCategory',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('category'),
                  required: true,
                  // options: res[0]?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
                  change: (filed, $event) => {
                    this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
                  },
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'itemSubcategory',
                type: 'ng-select',
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
                key: 'itemName',
                type: 'input',
                defaultValue:'',
                templateOptions: {
                  label: this._translateService.instant('ProductName'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'caseNumber',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('casNo'),
                  required: true,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'molFormula',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('MolecularFormula'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'origin',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('origin'),
                  required: true,
                  // options:res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'supplierCategory',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('SupplierType'),
                  required: true,
                  // options:res[2]?.map(v => ({ label: v?.categoryDescription, value: v?.categoryId })),
                },
              },
              {
                className: 'col-12',
                key: 'itemKeywords',
                type: 'chips',
                templateOptions: {
                  label: this._translateService.instant('keywords'),
                },
              },
              {
                className: 'col-12',
                key: 'attachment',
                type: 'upload',
                templateOptions: {
                  label: this._translateService.instant('ProductPicture'),
                }
              },
              {
                className: 'col-12',
                key: 'details',
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
                key: 'purity',
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
                key: 'appearence',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Appearance'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'storage',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Storage'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'application',
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
                key: 'advantage',
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
                key: 'relatedSubstance',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('RelatedSubstances'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'residueIgnition',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Residue_on_ignition'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'heavyMetal',
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
                key: 'meltingRange',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('MeltingRange'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'lossOnDrying',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Loss_on_drying'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ph',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('PH'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'residualSolvents',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('ResidualSolvents'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'form',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('From'),
                },
              },
              {
                className: 'col-md-6 col-12 mt-4',
                key: 'micronization',
                type: 'checkbox',
                defaultValue: false,
                templateOptions: {
                  label: this._translateService.instant('Micronization'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'particleSize',
                type: 'ng-select',
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
                key: 'opticalRotation',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('OpticalRotation'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'dissolutionRate',
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
                key: 'totalVac',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Total_viable_aerobic_Count'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'totalYamc',
                type: 'input',
                templateOptions: {
                  type: 'number',
                  label: this._translateService.instant('Total_yeast_and_mould_count'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'escherichiaColi',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('EscherichiaColi'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'salmonelaSpecies',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('SalmonellaSpecies'),
                },
              },
              {
                className: 'col-md-6 col-12 mt-4',
                key: 'injection',
                type: 'checkbox',
                defaultValue: false,
                templateOptions: {
                  label: this._translateService.instant('Injection'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'indotoxinTest',
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
          /*****************************ProductCertificates************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductCertificates'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row align-items-center',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'CertificateName',
                type: 'ng-select',
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
                className: 'col-md-3 col-12 p-0 mt-md-4',
                key: 'UploadProductCertificate',
                type: 'file',
                templateOptions: {
                  text: this._translateService.instant('UploadCertificate'),
                  required: true,
                  change: (filed, $event) => {
                    console.log('$event: ', $event);
                    console.log(this.model.UploadProductCertificate);
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
                    this.model.uploadAreaProducts = this.productCertificates
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
          /*****************************TradeInformation************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('TradeInformation'),
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'minOrderQuantity',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('MinimumOrderQuantity'),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Unit',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('Unit'),
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'InsertTradeInformationStorage',
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
                  type: 'date',
                  label: this._translateService.instant('ValidPeriod'),
                },
              },
            ],
          },
          /*****************************ProductPrice************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductPrice'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                type: 'repeat',
                key: 'productPrices',
                templateOptions: {
                  columns: ['from', 'to', 'price'],
                  columnLevel: true,
                  textAdd: this._translateService.instant('Price'),
                },
                fieldArray: {
                  fieldGroupClassName: 'row mr-2',
                  fieldGroup: [
                    {
                      className: 'col-md-3 col-12  px-2',
                      key: 'from',
                      templateOptions: { label: this._translateService.instant('From'), },
                      wrappers: ['panel'],
                      fieldGroup: [
                        {

                          key: 'value',
                          type: 'input',
                          templateOptions: {
                            type: 'number',
                            required: true,
                          },
                        },
                        {

                          key: 'type',
                          type: 'ng-select',
                          templateOptions: {
                            required: true,
                           // options:res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                          }
                        },
                      ],
                    },
                    {
                      className: 'col-md-3 col-12 p-0 pr-2',
                      key: 'to',
                      templateOptions: { label: this._translateService.instant('To'), },
                      wrappers: ['panel'],
                      fieldGroup: [
                        {

                          key: 'value',
                          type: 'input',
                          templateOptions: {
                            type: 'number',
                            required: true,
                          },
                        },
                        {
                          key: 'type',
                          type: 'ng-select',
                          templateOptions: {
                            required: true,
                           // options:res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                          },
                        },
                      ],
                    },
                    {
                      className: 'col-md-3 col-12 p-0 pr-2',
                      key: 'price',
                      templateOptions: { label: this._translateService.instant('Price'), },
                      wrappers: ['panel'],
                      fieldGroup: [
                        {

                          key: 'value',
                          type: 'input',
                          templateOptions: {
                            type: 'number',
                            required: true,
                          },
                        },
                        {

                          key: 'type',
                          type: 'ng-select',
                          templateOptions: {
                            required: true,
                            //options:res[4]?.map(v => ({ label: v?.currencyCode, value: v?.currencyId })),
                          },
                        },
                      ],
                    },

                  ]
                }
              },
              {
                className: 'col-12',
                key: 'paymentTerms',
                type: 'ng-select',
                templateOptions: {
                  required: true,
                  label: this._translateService.instant('PaymentTerms'),
                  options: []
                },
              },
            ],
          },
          /*****************************AllowedSample************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('AllowedSample'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'AllowedSample',
                type: 'checkbox',
                defaultValue: false,
                templateOptions: {
                  label: this._translateService.instant('AllowedSample'),
                },
              },
              {
                className: 'col-12 mb-3',
                template: `<img src="./assets/icons/info.svg" class="m-1"> <span class="mb-0 hint">${this._translateService.instant('add_attribute')}:</span>`,
              },
              {
                className: 'col-12',
                key: 'itemSampleType',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('sampleType'),
                  required: true,
                  //options:res[5]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId})),
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.AllowedSample ,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'sampleSize',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('SampleSize'),
                  required: true,
                  options: []
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.AllowedSample ,
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'sampleUnit',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('SampleUnit'),
                  required: true,
                  options: []
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.AllowedSample ,
                },
              },
            ],
          },

          /*****************************ProductShipping************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductShipping'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'portOfDispatching',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Port_of_Discharge')
                },
              },
            ],
          },
          /*****************************ProductionCapacity************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductionCapacity'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'productionCapacity',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Value')
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ProductionCapacityUnit',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('Unit'),
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Period',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('Period'),
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'estimatedDeliveryLeadTime',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('EstimatedLeadTime')
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'packaging',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Package')
                },
              },
              {
                className: 'col-12',
                key: 'Shipping',
                type: 'radio',
                templateOptions: {
                  type: 'radio',
                  label: this._translateService.instant('Shipping'),
                  name: 'Shipping',
                  options: [{ value: 'CustomerEnd', key: 'CustomerEnd' }, { value: 'SupplierEnd', key: 'SupplierEnd' }]
                }
              },
              {
                className: 'col-md-6 col-12',
                key: 'Incoterms',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('Incoterms'),
                 // options:res[6]?.map(v => ({ label: v?.incotermShortName, value: v?.incotermId })),
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'transportation',
                type: 'ng-select',
                templateOptions: {
                  label: this._translateService.instant('Transportation'),
                  //options:res[7]?.map(v => ({ label: v?.transportationName, value: v?.transportationId })),
                },
              },
            ],
          },

          /*****************************ShippingCertificate************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ShippingCertificate'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row align-items-center',
            fieldGroup: [
              {
                className: 'col-md-6 col-12',
                key: 'ShippingCertificateName',
                type: 'ng-select',
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
                className: 'col-md-3 col-12 p-0 mt-md-4',
                key: 'itemCertificates',
                type: 'file',
                templateOptions: {
                  text: this._translateService.instant('UploadCertificate'),
                  required: true,
                  change: (filed, $event) => {

                    let file = $event.target.files
                    let fileToUpload: any;
                    fileToUpload = file.item(0);
                    let reader = new FileReader();
                    reader.onload = (event: any) => {
                      this.model.UploadShippingCertificate = { src: event.target.result, fileToUpload: fileToUpload }
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
                    this.ShippingCertificate.push({ CertificateName: this.model?.ShippingCertificateName, file: this.model.UploadShippingCertificate })

                    this.model.uploadAreaShipping = this.ShippingCertificate

                    this.form.get('ShippingCertificateName')?.setValue(undefined)
                    this.form.get('ShippingCertificateName')?.reset()
                    this.form.get('UploadShippingCertificate')?.setValue(undefined)

                  },
                },
                expressionProperties: {
                  'templateOptions.disabled': () => !this.model.ShippingCertificateName || !this.model.UploadShippingCertificate,
                },
              },

              {
                className: 'col-12',
                key: 'uploadAreaShipping',
                type: 'uploadArea',
                templateOptions: {
                  items: this.ShippingCertificate
                },
              },
            ],
          },
          /*****************************Supplement************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('Supplement'),
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12 mb-3',
                template: `<span class="mb-0 hint font-italic">${this._translateService.instant('InsertSupplementMessage')}</span>`,
              },
              {
                className: 'col-12',
                type: 'repeat',
                key: 'itemSuppliments',
                templateOptions: {
                  columns: ['Attribute', 'Value'],
                  columnLevel: false,
                  textAdd: this._translateService.instant('Insert'),
                },
                fieldArray: {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-md-4 col-12',
                      key: 'attributeName',
                      type: 'input',
                      templateOptions: {
                        label: this._translateService.instant('Attribute'),
                      },
                    },
                    {
                      className: 'col-md-4 col-12',
                      key: 'attributeValue',
                      type: 'input',
                      templateOptions: {
                        label: this._translateService.instant('Value'),
                      },
                    },
                  ]
                }
              },

            ],
          },

        ],
      }
    ]
  }

  //   getDirtyValues(form: any) {
  //     let dirtyValues:any = {};

  //     Object.keys(form.controls)
  //         .forEach(key => {
  //             let currentControl = form.controls[key];

  //             if (currentControl.dirty) {
  //                 if (currentControl.controls)
  //                     dirtyValues[key] = this.getDirtyValues(currentControl);
  //                 else
  //                     dirtyValues[key] = currentControl.value;
  //             }
  //         });

  //     return dirtyValues;
  // }


  onSubmit() {
    let file =  this.model.attachment[0]
    console.log('file: ', file);
    const contentType =file.type;
    const bucket = new S3(
    {
    accessKeyId: 'BA6EM5E6W3S2W3HBZSAY',
    secretAccessKey: 'GifnJOJ+jpc1u+6bBLEmk2jNZdgSkH3jKB6LVsS56aM',
    region: 'fra1',
    }
    );
    const params = {
    Bucket: 'gajstore',
    Key: file.name,
    Body: file,
    ACL: 'public-read',
    ContentType: contentType
    };
    bucket.upload(params, function (err, data) {
    if (err) {
    console.log('EROOR: ',JSON.stringify( err));
    return false;
    }
    console.log('File Uploaded.', data);
    return true;
    });

  }
}
