import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { ItemCategoryDto, ItemControllerService, ItemDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { UploadFileService } from 'src/app/shared/services/file-upload.service';
@Component({
  selector: 'app-supplier-add-product',
  templateUrl: './supplier-add-product.component.html',
  styleUrls: ['./supplier-add-product.component.scss']
})
export class SupplierAddProductComponent extends AppBaseComponent implements OnInit,OnDestroy {
  productCertificates: any[] = []

  ShippingCertificate: any[] = []
  ItemCategory: Array<ItemCategoryDto> = []

  beforeImagesLoaded = []
  afterImagesLoaded = []
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
      this.LookupControllerService.getAllPaymentTermsUsingGET(),
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
                      this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v }))
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
                  defaultValue: '',
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
                    options: res[1]?.map(v => ({ label: v?.originName, value: v?.originId })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'supplierCategory',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('SupplierType'),
                    required: true,
                    options: res[2]?.map(v => ({ label: v?.categoryDescription, value: v })),
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
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('Purity'),
                    required: true,
                    placeholder: '%',
                    min: 0,
                    max: 100
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
                  type: 'number',
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
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('MeltingRange'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'lossOnDrying',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('Loss_on_drying'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ph',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('PH'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'residualSolvents',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('ResidualSolvents'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'form',
                  type: 'number',
                  templateOptions: {
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
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('ParticleSizeD90'),
                    required: true,
                    min: 0,
                    max: 100
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.micronization,
                  },
                },
                {
                  className: 'col-12',
                  key: 'opticalRotation',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('OpticalRotation'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'dissolutionRate',
                  type: 'number',
                  templateOptions: {
                    type: '',
                    label: this._translateService.instant('DissolutionRate'),
                    labelHint: '(hr/% Percentage) + ( * Minimum one )',
                    required: true,
                    placeholder: '%'
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'hour',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('hour'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'totalVac',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('Total_viable_aerobic_Count'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'totalYamc',
                  type: 'number',
                  templateOptions: {
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
                    'templateOptions.disabled': () => !this.model.injection,
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
                    options: [
                      { label: "c1", value: "c1" },
                      { label: "c2", value: "c2" }
                    ]
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.CertificateName,
                  },
                },
                {
                  className: 'col-md-3 col-12 p-0 mt-md-4 noFormGroup',
                  key: 'UploadProductCertificate',
                  type: 'file-upload',
                  templateOptions: {
                    text: this._translateService.instant('UploadCertificate'),
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
                  expressionProperties: {
                    'templateOptions.required': () => this.model.CertificateName,
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
                      this.model.uploadAreaCertificate = this.productCertificates
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
                  key: 'uploadAreaCertificate',
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
                open: true,
                required: true
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
                  key: 'uom',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                    required:true
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
                  key: 'expiryDate',
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
                              options: res[3]?.map(v => ({ label: v?.uomShortName, value: v })),
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
                              options: res[3]?.map(v => ({ label: v?.uomShortName, value: v })),
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
                              options: res[4]?.map(v => ({ label: v?.currencyCode, value: v })),
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
                    options: res[8]?.map(v => ({ label: v?.paymentTermName, value: v })),
                    multiple: true
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
                    options: res[5]?.map(v => ({ label: v?.itemSampleTypesName, value: v })),
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample,
                    'templateOptions.required': () => this.model.AllowedSample,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleSize',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('SampleSize'),
                    required: true,
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample,
                    'templateOptions.required': () => this.model.AllowedSample,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleUnit',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('SampleUnit'),
                    required: true,
                    options: res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.AllowedSample,
                    'templateOptions.required': () => this.model.AllowedSample,
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
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('Value'),
                    change: (f, v) => {
                      if (!v.target.value && !this.form.get('estimatedDeliveryLeadTime')?.value) {
                        this.form.get('Period').setValue(undefined)
                        this.form.get('Period').reset()
                      }
                      if (!v.target.value) {
                        this.form.get('ProductionCapacityUnit').setValue(undefined)

                        this.form.get('ProductionCapacityUnit').reset()
                      }
                    }
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ProductionCapacityUnit',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomShortName })),
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.productionCapacity,
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'Period',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Period'),
                    options: [
                      { label: 'Day', value: 'day' },
                      { label: 'Week', value: 'week' },
                      { label: 'Month', value: 'month' },
                      { label: 'Quarter', value: 'quarter' },
                      { label: 'Year', value: 'year' },
                    ]
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model?.productionCapacity || this.model?.estimatedDeliveryLeadTime,
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'estimatedDeliveryLeadTime',
                  type: 'number',
                  templateOptions: {
                    label: this._translateService.instant('EstimatedLeadTime'),
                    change: (f, v) => {
                      if (!v.target.value && !this.form.get('productionCapacity')?.value) {
                        this.form.get('Period').setValue(undefined)
                        this.form.get('Period').reset()
                      }
                    }
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
                    options: res[6]?.map(v => ({ label: v?.incotermShortName, value: v })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'transportation',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Transportation'),
                    options: res[7]?.map(v => ({ label: v?.transportationName, value: v })),
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
                    options: [
                      { label: "c1", value: "c1" },
                      { label: "c2", value: "c2" }
                    ]
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.itemCertificates,
                  },
                },
                {
                  className: 'col-md-3 col-12 p-0 mt-md-4 noFormGroup',
                  key: 'itemCertificates',
                  type: 'file-upload',
                  templateOptions: {
                    text: this._translateService.instant('UploadCertificate'),
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
                  expressionProperties: {
                    'templateOptions.required': () => this.model.ShippingCertificateName,
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
                    columns: ['attributeName', 'attributeValue'],
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


    this.UploadFileService.resData.subscribe(res => {
      let addItemStorage
      var Values = [];
      //get olds values
     if(window.localStorage.getItem('addItemStorage'))  {
       addItemStorage  = window.localStorage.getItem('addItemStorage')
      Values = JSON.parse(addItemStorage);
     }

      //push new value
      Values.push(res);

      window.localStorage.setItem('addItemStorage', JSON.stringify(Values))

      if(JSON.parse(window.localStorage.getItem('addItemStorage'))?.length === this.beforeImagesLoaded?.length){
        let finalUploaded = JSON.parse(window.localStorage.getItem('addItemStorage'))
        let productPicture:string;
        let productCertificates = []
        let productShippingCertificates =  []
        finalUploaded.forEach(element => {
          if(element.includes('/picture')){
            productPicture= element
          }
          else if(element.includes('/certificate')){
            productCertificates.push(element)
          }
          else{
            productShippingCertificates.push(element)
          }

        });

        let finalProductCertificates = []
        let finalProductShippingCertificates =  []
        if(productCertificates?.length){
          productCertificates.forEach((element,index) => {
            finalProductCertificates.push( {
              attachment: {
                attachmentSource:{
                  "attachmentSourceId": index+1,
                  attachmentSourceName:element
                },
                reference: element
              },
              itemCertificateName: this.model?.uploadAreaCertificate[index]?.CertificateName
            })
          })
        }

        if(productShippingCertificates?.length){
          productShippingCertificates.forEach((element,index) => {
            finalProductShippingCertificates.push( {
              attachment: {
                attachmentSource: element,
                reference: element
              },
              itemCertificateName: this.model?.uploadAreaShipping[index]
            })
          })
        }




          let itemDto: ItemDto = {
            advantage: this.model?.advantage,
            appearence: this.model?.appearence,
            application: this.model?.application,
            attachment: {
              attachmentSource: {
                attachmentSourceId: 1,
                attachmentSourceName: productPicture
              },
              reference: productPicture
            },
            caseNumber: this.model?.caseNumber,
            coa: 'coa',
            details: this.model?.details,
            dissolutionRate: this.model?.dissolutionRate && this.model?.hour ? `${this.model?.hour}hr/${this.model?.dissolutionRate}%` : undefined,
            escherichiaColi: this.model?.escherichiaColi,
            estimatedDeliveryLeadTime: `${this.model?.estimatedDeliveryLeadTime}${this.model?.Period}`,
            expiryDate: new Date(this.model?.expiryDate),
            form: this.model?.form,
            heavyMetal: this.model?.heavyMetal,
            incoterms: this.model?.incoterms,
            indotoxinTest: this.model?.indotoxinTest,
            injection: this.model?.injection,
            itemCategory: {
              categoryId: +this.model?.itemCategory
            },
            itemCertificates:finalProductCertificates,
            itemKeywords: this.model?.itemKeywords?.map(v => ({ keyword: v?.name })),
            itemName: this.model?.itemName,
            itemPricings: this.model?.productPrices?.map(v => ({
              fromQuantity: +v?.from?.value,
              fromUom: { uomId: +v?.from?.type?.uomId },
              toQuantity: +v?.to?.value,
              toUom: { uomId: +v?.to?.type?.uomId },
              price: +v?.price?.value,
              currency: { currencyId: +v?.price?.type?.currencyId }
            })),
            itemSampleType: this.model?.itemSampleType ? this.model?.itemSampleType : undefined,
            itemSubcategory: this.model?.itemSubcategory ? this.model?.itemSubcategory : undefined,
            itemSuppliments: this.model?.itemSuppliments?.map((v,i) => ({
              attributeName: v?.attributeName,
              attributeValue: v?.attributeValue,
              itemSupplimentId:i+1
            })),
            lossOnDrying: +this.model?.lossOnDrying,
            meltingRange: +this.model?.meltingRange,
            micronization: this.model?.micronization,
            minOrderQuantity: +this.model?.minOrderQuantity,
            molFormula: this.model?.molFormula,
            opticalRotation: +this.model?.opticalRotation,
            origin: this.model?.origin ? { originId: +this.model?.origin } : undefined,
            packaging: this.model?.packaging,
            particleSize: this.model?.particleSize,
            paymentTerms: this.model?.paymentTerms?.map(v => ({ paymentTermName: v?.paymentTermName, status: true })),
            ph: +this.model?.ph,
            portOfDispatching: this.model?.portOfDispatching,
            productionCapacity: this.model?.productionCapacity ? `${this.model?.productionCapacity}${this.model?.ProductionCapacityUnit}/${this.model?.Period}` : undefined,
            purity: this.model?.purity ? `${this.model?.purity}%` : undefined,
            relatedSubstance: this.model?.relatedSubstance,
            residualSolvents: +this.model?.residualSolvents,
            residueIgnition: +this.model?.residueIgnition,
            salmonelaSpecies: this.model?.salmonelaSpecies,
            sampleSize:this.model?.sampleSize? +this.model?.sampleSize:undefined,
            sampleUnit: this.model?.sampleUnit ? { uomId: +this.model?.sampleUnit, } : undefined,
            status: 0,
            storage: this.model?.storage,
            supplier: this.userData?.supplierId ? { supplierId: +this.userData?.supplierId } : undefined,
            supplierCategory: this.model?.supplierCategory,
            totalVac: this.model?.totalVac ? `${this.model?.totalVac}cfu/gm` : undefined,
            totalYamc: this.model?.totalYamc ? `${this.model?.totalYamc}cfu/gm` : undefined,
            transportation: this.model?.transportation,
            uom: this.model?.uom ? { uomId: +this.model?.uom } : undefined
          }
          const addItemUsingPOSTSub = this._itemControllerService.addItemUsingPOST(itemDto).pipe(finalize(()=>{
              this.isSubmit = false
          })).subscribe((res: ItemDto) => {
            if (res) {
              this.toaster.success(this._translateService.instant('addedSuccessfully'))
              this.options.resetModel()
              this._sharedService.dropzoneEmptySubj.next(true)
            }

          })
          this.unSubscription.push(addItemUsingPOSTSub)

      }



    })



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
    this.isSubmit = true;

    window.localStorage.removeItem('addItemStorage')
    this.beforeImagesLoaded = []
    let prodSeq = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)

    if (this.model?.attachment?.length) {

      this.beforeImagesLoaded?.push(this.model?.attachment[0])

      this.UploadFileService.uploadMultiple([this.model?.attachment[0]], `products/product-${prodSeq}/picture`)
    }

    if (this.model?.uploadAreaCertificate?.length) {

      let uploadCertificate = []
      this.model?.uploadAreaCertificate?.forEach(element => {
        this.beforeImagesLoaded.push(element?.file?.fileToUpload)
        uploadCertificate.push(element?.file?.fileToUpload)
      });

      this.UploadFileService.uploadMultiple(uploadCertificate, `products/product-${prodSeq}/certificate`)
    }

    if (this.model?.uploadAreaShipping.length) {

      let uploadShippingCertificate = []


      this.model?.uploadAreaShipping?.forEach(element => {
        this.beforeImagesLoaded.push(element?.file?.fileToUpload)
        uploadShippingCertificate.push(element?.file?.fileToUpload)
      });

      this.UploadFileService.uploadMultiple(uploadShippingCertificate, `products/product-${prodSeq}/shippingCertificate`)
    }



  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.localStorage.removeItem('addItemStorage')
  }
}
