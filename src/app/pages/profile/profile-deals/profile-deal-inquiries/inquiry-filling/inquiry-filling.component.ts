import { DatePipe } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { finalize, forkJoin, take } from 'rxjs';
import { CertificateTypeDto, IncotermDto, InquiryControllerService, InquiryCreationRequestDto, ItemCategoryDto, ItemControllerService, ItemDto, ItemIncotermDto, ItemPaymentTermDto, ItemSampleTypeDto, OriginDto, OriginIdDto, PaymentTermDto, SupplierCategoryDto, TransportationDto, UomDto, ViewInquiryMainDataDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-inquiry-filling',
  templateUrl: './inquiry-filling.component.html',
  styleUrls: ['./inquiry-filling.component.scss'],
  providers: [DatePipe]
})
export class InquiryFillingComponent extends AppBaseComponent implements OnInit, OnDestroy {
  productDetails: ItemDto;
  productId: number;
  ItemCategory: Array<ItemCategoryDto> = []
  itemSubcategories = []
  supplierCategory: Array<SupplierCategoryDto> = []
  PaymentTermsArr: Array<ItemPaymentTermDto> = []

  incotermsArr: Array<ItemIncotermDto> = []
  TransportationArr: Array<TransportationDto> = []

  ItemSampleTypeArr: Array<ItemSampleTypeDto> = []
  CertificateTypArr: Array<CertificateTypeDto> = []
  origins: Array<OriginIdDto> = []
  units: Array<UomDto> = []

  productCertificates: any[] = []
  ShippingCertificate: any[] = []

  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    private _inquiryControllerService: InquiryControllerService,
    private datePipe: DatePipe
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.productId = param['productId']
    })
    this.isLoadingForm = true
  }





  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Deals') },
      { label: this._translateService.instant('InquiryFilling'), active: true },

    ]

    let observables: any = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
      this.LookupControllerService.getSuppliersCategoryUsingGET(),
      this.LookupControllerService.getUnitOfMeasureUsingGET(),
      this.LookupControllerService.getCurrenciesUsingGET(),
      this.LookupControllerService.getItemSampleTypesUsingGET(),
      this._itemControllerService.getItemIncotermsUsingGET(this.productId),
      this.LookupControllerService.gettranspTransportationDtosUsingGET(),
      this._itemControllerService.getItemPaymentTermsUsingGET(this.productId),
      this.LookupControllerService.getItemProdCapacityUsingGET(),
      this.LookupControllerService.getItemCerTypeUsingGET(),
      this.LookupControllerService.getShippingCerTypeUsingGET(),
    ]

    if (this.productId) {
      observables.push(this._itemControllerService.getItemByItemIdUsingGET(this.productId))
    }

    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.productDetails = res[12] ? res[12] : []
      this.ItemCategory = res[0] ? res[0] : []
      this.origins = res[1] ? res[1] : []
      this.supplierCategory = res[2] ? res[2] : []
      this.units = res[3] ? res[3] : []
      this.PaymentTermsArr = res[8] ? res[8] : []
      this.ItemSampleTypeArr = res[5] ? res[5] : []
      this.incotermsArr = res[6] ? res[6] : [];


      if (this.productId) {
        this.itemSubcategories = this.ItemCategory?.find(v => this.productDetails?.itemCategory?.categoryId === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v }))
        this.productCertificates = this.productDetails?.itemCertificateDtos.map(v => (
          {
            Certificate: { Certificate: v?.itemCertificateName }, file: { src: v?.attachment?.reference }
          }
        ))
        this.ShippingCertificate = this.productDetails?.shippingCertificateDtos.map(v => (
          {
            Certificate: { Certificate: v?.itemCertificateName }, file: { src: v?.attachment?.reference }
          }
        ))

        this.model.itemSuppliments = this.productDetails?.itemSuppliments
      }
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
                  defaultValue: this.productDetails?.itemCategory?.categoryId,
                  templateOptions: {
                    label: this._translateService.instant('category'),
                    required: true,
                    options: res[0]?.map(v => ({ label: v?.categoryName, value: v?.categoryId })),
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'itemSubcategory',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.itemSubcategory?.itemSubcategoryId,
                  templateOptions: {
                    label: this._translateService.instant('SubCategory'),
                    required: true,
                    options: this.productId ? this.ItemCategory?.find(v => this.productDetails?.itemCategory?.categoryId === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId })) : [],
                    readonly: true
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
                  defaultValue: this.productDetails?.itemName,
                  templateOptions: {
                    label: this._translateService.instant('ProductName'),
                    required: true,
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'caseNumber',
                  type: 'number',
                  defaultValue: this.productDetails?.caseNumber,
                  templateOptions: {
                    label: this._translateService.instant('casNo'),
                    required: true,
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'molFormula',
                  type: 'input',
                  defaultValue: this.productDetails?.molFormula,
                  templateOptions: {
                    label: this._translateService.instant('MolecularFormula'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'origin',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.origin?.originId,
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
                  defaultValue: this.productDetails?.supplierCategory?.categoryId,
                  templateOptions: {
                    label: this._translateService.instant('SupplierType'),
                    required: true,
                    options: res[2]?.map(v => ({ label: v?.categoryDescription, value: v?.categoryId })),
                    readonly: true
                  },
                },
                {
                  className: 'col-12',
                  key: 'itemKeywords',
                  type: 'chips',
                  defaultValue: this.productDetails?.itemKeywords?.map(v => (v?.keyword)),
                  templateOptions: {
                    label: this._translateService.instant('keywords'),
                    disable: true
                  },
                },

                {
                  className: 'col-12',
                  key: 'details',
                  type: 'textarea',
                  defaultValue: this.productDetails?.details,
                  templateOptions: {
                    label: this._translateService.instant('productDetails'),
                    rows: 5,
                    readonly: true
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
                  defaultValue: this.productDetails?.purity?.match(/\d+/)[0],
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
                  defaultValue: this.productDetails?.appearence,
                  templateOptions: {
                    label: this._translateService.instant('Appearance'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'storage',
                  type: 'input',
                  defaultValue: this.productDetails?.storage,
                  templateOptions: {
                    label: this._translateService.instant('Storage'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'application',
                  type: 'input',
                  defaultValue: this.productDetails?.application,
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
                  defaultValue: this.productDetails?.advantage,
                  templateOptions: {
                    label: this._translateService.instant('Advantage'),
                    rows: 5,
                    readonly: true
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
                  defaultValue: this.productDetails?.relatedSubstance,
                  templateOptions: {
                    label: this._translateService.instant('RelatedSubstances'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'residueIgnition',
                  type: 'number',
                  defaultValue: this.productDetails?.residueIgnition,
                  templateOptions: {
                    label: this._translateService.instant('Residue_on_ignition'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'heavyMetal',
                  type: 'input',
                  defaultValue: this.productDetails?.heavyMetal,
                  templateOptions: {
                    label: this._translateService.instant('HeavyMetal'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'validPeriod',
                  type: 'input',
                  defaultValue: this.productDetails?.validPeriod ? new Date(this.productDetails?.validPeriod).toISOString().split('T')[0] : undefined,
                  templateOptions: {
                    type: 'date',
                    label: this._translateService.instant('ValidPeriod'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'meltingRange',
                  type: 'number',
                  defaultValue: this.productDetails?.meltingRange,
                  templateOptions: {
                    label: this._translateService.instant('MeltingRange'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'lossOnDrying',
                  type: 'number',
                  defaultValue: this.productDetails?.lossOnDrying,
                  templateOptions: {
                    label: this._translateService.instant('Loss_on_drying'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ph',
                  type: 'number',
                  defaultValue: this.productDetails?.ph,
                  templateOptions: {
                    label: this._translateService.instant('PH'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'residualSolvents',
                  type: 'number',
                  defaultValue: this.productDetails?.residualSolvents,
                  templateOptions: {
                    label: this._translateService.instant('ResidualSolvents'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'form',
                  type: 'input',
                  defaultValue: this.productDetails?.form,
                  templateOptions: {
                    label: this._translateService.instant('From'),
                  },
                },
                {
                  className: 'col-md-6 col-12 mt-4',
                  key: 'micronization',
                  type: 'checkbox',
                  defaultValue: this.productDetails?.micronization ? this.productDetails?.micronization : false,
                  templateOptions: {
                    label: this._translateService.instant('Micronization'),
                    change: (f, e) => {
                      if (!e.target?.checked) {
                        this.form.get('particleSize')?.setValue(undefined)
                      }
                    }
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'particleSize',
                  type: 'number',
                  defaultValue: this.productDetails?.particleSize,
                  templateOptions: {
                    label: this._translateService.instant('ParticleSizeD90'),
                    required: true,
                    min: 0,
                    max: 100
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.micronization,
                    'templateOptions.required': () => this.model.micronization,
                  },
                },
                {
                  className: 'col-12',
                  key: 'opticalRotation',
                  type: 'number',
                  defaultValue: this.productDetails?.opticalRotation,
                  templateOptions: {
                    label: this._translateService.instant('OpticalRotation'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'dissolutionRate',
                  type: 'number',
                  defaultValue: +this.productDetails?.dissolutionRate?.split("hr/")[1]?.replace("%", ""),
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
                  defaultValue: +this.productDetails?.dissolutionRate?.split(/hr(.*)/)[0],
                  templateOptions: {
                    label: this._translateService.instant('hour'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'totalVac',
                  type: 'number',
                  defaultValue: +this.productDetails?.totalVac?.split("cfu/gm")[0],
                  templateOptions: {
                    label: this._translateService.instant('Total_viable_aerobic_Count'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'totalYamc',
                  type: 'number',
                  defaultValue: +this.productDetails?.totalYamc?.split("cfu/gm")[0],
                  templateOptions: {
                    label: this._translateService.instant('Total_yeast_and_mould_count'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'escherichiaColi',
                  type: 'input',
                  defaultValue: this.productDetails?.escherichiaColi,
                  templateOptions: {
                    label: this._translateService.instant('EscherichiaColi'),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'salmonelaSpecies',
                  type: 'input',
                  defaultValue: this.productDetails?.salmonelaSpecies,
                  templateOptions: {
                    label: this._translateService.instant('SalmonellaSpecies'),
                  },
                },
                {
                  className: 'col-md-6 col-12 mt-4',
                  key: 'injection',
                  type: 'checkbox',
                  defaultValue: this.productDetails?.injection ? this.productDetails?.injection : false,
                  templateOptions: {
                    label: this._translateService.instant('Injection'),
                    change: (f, e) => {
                      if (!e.target?.checked) {
                        this.form.get('indotoxinTest')?.setValue(undefined)
                      }
                    }
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'indotoxinTest',
                  type: 'number',
                  defaultValue: this.productDetails?.indotoxinTest,
                  templateOptions: {
                    label: this._translateService.instant('endotoxinTest'),
                    required: true
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.injection,
                    'templateOptions.required': () => this.model.injection,
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
                  className: 'col-12',
                  key: 'uploadAreaCertificate',
                  type: 'uploadArea',
                  templateOptions: {
                    items: this.productCertificates,
                    productId: this.productId,
                    type: 'certificate',
                    delete: false
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
                  defaultValue: this.productDetails?.minOrderQuantity,
                  templateOptions: {
                    label: this._translateService.instant('MinimumOrderQuantity'),
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'uom',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.uom?.uomId,
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
                    required: true,
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'storageTradeInformation',
                  type: 'input',
                  defaultValue: this.productDetails?.storageTradeInformation,
                  templateOptions: {
                    label: this._translateService.instant('Storage'),
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'expiryDate',
                  type: 'input',
                  defaultValue: this.productDetails?.expiryDate ? new Date(this.productDetails?.expiryDate).toISOString().split('T')[0] : undefined,
                  templateOptions: {
                    type: 'date',
                    label: this._translateService.instant('ValidPeriod'),
                    readonly: true
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
                  type: 'repeat-price',
                  key: 'productPrices',
                  templateOptions: {
                    inquiry: true,
                    columns: ['quantity', 'price', 'PaymentTerms'],
                    columnLevel: true,
                    textAdd: this._translateService.instant('Price'),
                    supplierPrices: this.productDetails?.itemPricings?.map(v => (
                      {
                        from: { value: v?.fromQuantity, type: v?.fromUom },
                        to: { value: v?.toQuantity, type: v?.toUom },
                        price: { value: v?.price, type: v?.currency },
                      }
                    ))
                  },
                  fieldArray: {
                    fieldGroupClassName: 'row mr-md-2',
                    fieldGroup: [
                      {
                        className: 'col-md-3 col-12  px-md-2',
                        key: 'quantity',
                        templateOptions: { label: this._translateService.instant('Quantity'), required: true, },
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
                        className: 'col-md-3 col-12  pr-md-2',
                        key: 'price',
                        templateOptions: { label: this._translateService.instant('Price'), required: true, },
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
                      }, {
                        className: 'col-md-3 col-12 pr-md-2',
                        key: 'PaymentTerms',
                        type: 'ng-select',
                        templateOptions: {
                          label: this._translateService.instant('PaymentTerms'),
                          required: true,
                          options: res[8]?.map(v => ({ label: v?.paymentTerm?.paymentTermName, value: v })),
                        },

                      },
                      {
                        key: 'inquiry'
                      }
                    ]
                  }
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
                  key: 'itemSampleType',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.itemSampleType?.itemSampleTypesId,
                  templateOptions: {
                    label: this._translateService.instant('sampleType'),
                    required: true,
                    options: res[5]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleSize',
                  type: 'number',
                  defaultValue: this.productDetails?.sampleSize,
                  templateOptions: {
                    label: this._translateService.instant('SampleSize'),
                    required: true,
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'sampleUnit',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.sampleUnit?.uomId,
                  templateOptions: {
                    label: this._translateService.instant('SampleUnit'),
                    required: true,
                    options: res[3]?.map(v => ({ label: v?.uomShortName, value: v?.uomId })),
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
                  defaultValue: this.productDetails?.portOfDispatching,
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
                  defaultValue: this.productDetails?.productionCapacity?.split("/")[0]?.match(/\d+/)[0],
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
                    },
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'ProductionCapacityUnit',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.productionCapacity?.split("/")[0]?.replace(/[^a-zA-Z]+/g, ''),
                  templateOptions: {
                    label: this._translateService.instant('Unit'),
                    options: res[9]?.productionWeight?.map(v => ({ label: v?.toLowerCase(), value: v })),
                    readonly: true
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.productionCapacity,
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'Period',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.productionCapacity?.split("/")[1],
                  templateOptions: {
                    label: this._translateService.instant('Period'),
                    options: res[9]?.productionPeriod?.map(v => ({ label: v?.toLowerCase(), value: v })),
                    readonly: true
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model?.productionCapacity || this.model?.estimatedDeliveryLeadTime,
                  }
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'estimatedDeliveryLeadTime',
                  type: 'number',
                  defaultValue: this.productDetails?.estimatedDeliveryLeadTime?.match(/\d+/)[0],
                  templateOptions: {
                    label: this._translateService.instant('EstimatedLeadTime'),
                    change: (f, v) => {
                      if (!v.target.value && !this.form.get('productionCapacity')?.value) {
                        this.form.get('Period').setValue(undefined)
                        this.form.get('Period').reset()
                      }
                    },
                    readonly: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'packaging',
                  type: 'input',
                  defaultValue: this.productDetails?.packaging,
                  templateOptions: {
                    label: this._translateService.instant('Package')
                  },
                },
                // {
                //   className: 'col-12',
                //   key: 'Shipping',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: this._translateService.instant('Shipping'),
                //     name: 'Shipping',
                //     options: [{ value: 'CustomerEnd', key: 'CustomerEnd' }, { value: 'SupplierEnd', key: 'SupplierEnd' }]
                //   }
                // },
                {
                  className: 'col-md-6 col-12',
                  key: 'incoterms',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.incoterms?.map(v => (v?.incotermId))[0],
                  templateOptions: {
                    label: this._translateService.instant('Incoterms'),
                    options: res[6]?.map(v => ({ label: v?.incotermShipping?.incoterm?.incotermShortName, value: v?.incotermShipping?.incoterm?.incotermId })),
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'transportation',
                  type: 'ng-select',
                  defaultValue: this.productDetails?.transportation?.transportationId,
                  templateOptions: {
                    label: this._translateService.instant('Transportation'),
                    options: res[7]?.map(v => ({ label: v?.transportationName, value: v?.transportationId })),
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
                  className: 'col-12',
                  key: 'uploadAreaShipping',
                  type: 'uploadArea',
                  templateOptions: {
                    items: this.ShippingCertificate,
                    productId: this.productId,
                    type: 'shippingCertificate',
                    delete: false,
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
                  defaultValue: this.productDetails?.itemSuppliments?.map(v => (
                    {
                      attributeName: v?.attributeName,
                      attributeValue: v?.attributeValue
                    }
                  )),
                  templateOptions: {
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
                          columnLevel: false,
                          label: this._translateService.instant('Attribute'),
                        },
                      },
                      {
                        className: 'col-md-4 col-12',
                        key: 'attributeValue',
                        type: 'input',
                        templateOptions: {
                          label: this._translateService.instant('Value'),
                          disabled: false,
                          // change: (f, e) => {
                          //   if (e?.target?.value) {
                          //     this.fields[0].fieldGroup[12].fieldGroup[1].fieldArray.fieldGroup[2].templateOptions.disabled = true
                          //   } else {
                          //     this.fields[0].fieldGroup[12].fieldGroup[1].fieldArray.fieldGroup[2].templateOptions.disabled = false
                          //   }
                          // }
                        },

                      },
                      // {
                      //   className: 'col-md-3 col-12 mt-md-4',
                      //   key: 'UploadFile',
                      //   type: 'file-upload',
                      //   templateOptions: {
                      //     text: this._translateService.instant('UploadFile'),
                      //     disabled: false,
                      //     change: (f, e) => {
                      //       if (e) {
                      //         this.uploadNewFile = true
                      //         this.fields[0].fieldGroup[12].fieldGroup[1].fieldArray.fieldGroup[1].templateOptions.disabled = true
                      //       } else {
                      //         this.fields[0].fieldGroup[12].fieldGroup[1].fieldArray.fieldGroup[1].templateOptions.disabled = false
                      //       }

                      //     }
                      //   },

                      // },
                    ]
                  }
                },
                {
                  className: 'col-12',
                  key: 'extraComment',
                  type: 'textarea',
                  templateOptions: {
                    label: this._translateService.instant('Extra_point_discussion'),
                    rows: 5,
                    placeholder: this._translateService.instant('Extra_point_discussionMessage'),
                  },
                },
              ],
            },

          ],
        }
      ]
    });



    // let productCertificates = [
    //   {CertificateName:'Certificate Name 01' , file:'assets/img/molecular-structure.png'},
    //   {CertificateName:'Certificate Name 02' , file:'assets/img/molecular-structure.png'}
    // ]

    // let observables:any = []
    // productCertificates.forEach(element => {
    //     observables.push(this._sharedService.getBlob(element.file))
    // });
    // forkJoin(observables).pipe(take(1)).subscribe((res: any) => {
    //

    // })

    // this.productCertificates = [{ CertificateName:'Certificate Name 01', file: ''}]
  }
  onSubmit(type?: string) {
    this.isSubmit = true;
    let InquiryCreationRequestDto: InquiryCreationRequestDto = {
      appearance: this.model?.appearence,
      application: this.model?.application,
      dissolutionRate: this.model?.dissolutionRate && this.model?.hour ? `${this.model?.hour}hr/${this.model?.dissolutionRate}%` : undefined,
      escherichiaColi: this.model?.escherichiaColi,
      expiryDate: new Date(this.model?.validPeriod),
      form: this.model?.form,
      heavyMetal: this.model?.heavyMetal,
      itemIncoterm: { itemIncotermId: this.incotermsArr.find(v => v?.incotermShipping?.incoterm?.incotermId === this.model?.incoterms)?.itemIncotermId },

      indotoxinTest: this.model?.indotoxinTest,
      injection: this.model?.injection,

      inquiryVersionPrices: this.model?.productPrices?.map(v => ({
        inquiryPriceId: null,
        quantity: +v?.quantity?.value,
        uom: v?.quantity?.type,
        unitPrice: +v?.price?.value,
        currency: { currencyId: v?.price?.type?.currencyId, currencyCode: v?.price?.type?.currencyCode, currencyName: v?.price?.type?.currencyName },
        itemPaymentTerm: { itemPaymentTermId: v?.PaymentTerms?.itemPaymentTermId },
      })),
      itemSampleType: this.model?.itemSampleType ? this.ItemSampleTypeArr?.find(v => v?.itemSampleTypesId === this.model?.itemSampleType) : undefined,
      inquiryVersionSuppliments: this.model?.itemSuppliments ? this.model?.itemSuppliments?.map((v, i) => ({
        "inquirySupplimentId": null,
        attribute: v?.attributeName,
        value: v?.attributeValue,
        attachFlag: false,
      })) : [],
      lossOnDrying: +this.model?.lossOnDrying,
      meltingRange: +this.model?.meltingRange,
      micronization: this.model?.micronization,
      molFormula: this.model?.molFormula,
      opticalRotation: +this.model?.opticalRotation,
      origin: this.model?.origin ? this.origins?.find(v => v?.originId === this.model?.origin) : undefined,
      packaging: this.model?.packaging,
      particleSize: this.model?.particleSize,
      ph: +this.model?.ph,
      portOfDestination: this.model?.portOfDispatching,
      purity: this.model?.purity ? `${this.model?.purity}%` : undefined,
      relatedSubstance: this.model?.relatedSubstance,
      residualSolvents: +this.model?.residualSolvents,
      residueIgnition: +this.model?.residueIgnition,
      salmonelaSpecies: this.model?.salmonelaSpecies,
      sampleSize: this.model?.sampleSize ? +this.model?.sampleSize : undefined,
      sampleUnit: this.model?.sampleUnit ? this.units.find(v => v?.uomId === this.model?.sampleUnit) : undefined,
      storage: this.model?.storage,
      totalVac: this.model?.totalVac ? `${this.model?.totalVac}cfu/gm` : undefined,
      totalYamc: this.model?.totalYamc ? `${this.model?.totalYamc}cfu/gm` : undefined,
      transportation: this.model?.transportation ? this.TransportationArr.find(v =>{v?.transportationId ===  this.model?.transportation}) : undefined,
      itemId: this.productId ? +this.productId : undefined,
      extraComment: this.model?.extraComment,
      "inquiry": {
        "inquiryId": null
      },
    }
    if (type !== 'draft') {
      const addInquiryUsingPOSTSub = this._inquiryControllerService.addInquiryUsingPOST(InquiryCreationRequestDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: InquiryCreationRequestDto) => {
        if (res) {
          const viewInquiryMainDataSub = this._inquiryControllerService.viewInquiryMainDataUsingGET(res?.inquiry?.inquiryId).subscribe((res2: ViewInquiryMainDataDto) => {
            this.router.navigate(['/profile/deals/inquiries', res2?.dealId, this.productDetails?.itemId])
          })
          this.unSubscription.push(viewInquiryMainDataSub)
        }


      })
      this.unSubscription.push(addInquiryUsingPOSTSub)
    } else {
      const addInquiryUsingPOSTSub = this._inquiryControllerService.addInquiryAsDraftUsingPOST(InquiryCreationRequestDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: InquiryCreationRequestDto) => {
        if (res) {
            this.router.navigate(['/profile/deals/inquiries'])
        }


      })
      this.unSubscription.push(addInquiryUsingPOSTSub)
    }








  }
  onSAaveAsDraft() {

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.localStorage.removeItem('addItemStorage')
  }
}

