import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { CertificateTypeDto, IncotermDto, ItemCategoryDto, ItemControllerService, ItemDto, ItemSampleTypeDto, ItemSubcategoryDto, PaymentTermDto, SupplierCategoryDto, TransportationDto } from 'src/app/@api';
import { ItemAttachmentsDto } from 'src/app/@api/model/itemAttachmentsDto';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-supplier-add-product',
  templateUrl: './supplier-add-product.component.html',
  styleUrls: ['./supplier-add-product.component.scss'],
  providers: [DatePipe]
})
export class SupplierAddProductComponent extends AppBaseComponent implements OnInit, OnDestroy {
  productCertificates: any[] = []

  ShippingCertificate: any[] = []
  ItemCategory: Array<ItemCategoryDto> = []
  itemSubcategories = []
  supplierCategory: Array<SupplierCategoryDto> = []
  PaymentTermsArr: Array<PaymentTermDto> = []

  incotermsArr: Array<IncotermDto> = []
  TransportationArr: Array<TransportationDto> = []

  ItemSampleTypeArr: Array<ItemSampleTypeDto> = []
  CertificateTypArr: Array<CertificateTypeDto> = []
  productId: number;
  productDetails: ItemDto

  uploadNewFile = false

  constructor(
    injector: Injector,
    private _itemControllerService: ItemControllerService,
    private datePipe: DatePipe
  ) {
    super(injector);
    this.route.params.subscribe(param => {
      this.productId = param['id']
    })
    this.isLoadingForm = true
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('ProductsAddition'), active: true },
    ]

    let observables: any = [
      this.LookupControllerService.getItemsCategoryUsingGET(),
      this.LookupControllerService.getOriginsUsingGET(),
      this.LookupControllerService.getSuppliersCategoryUsingGET(),
      this.LookupControllerService.getUnitOfMeasureUsingGET(),
      this.LookupControllerService.getCurrenciesUsingGET(),
      this.LookupControllerService.getItemSampleTypesUsingGET(),
      this.LookupControllerService.getAllIncotermsUsingGET(),
      this.LookupControllerService.gettranspTransportationDtosUsingGET(),
      this.LookupControllerService.getAllPaymentTermsUsingGET(),
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
      this.supplierCategory = res[2] ? res[2] : []
      this.PaymentTermsArr = res[8] ? res[8] : []
      this.ItemSampleTypeArr = res[5] ? res[5] : []
      this.incotermsArr = res[6] ? res[6] : []

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
                    change: (filed, $event) => {
                      this.form.get("itemSubcategory").setValue(undefined)
                      this.fields[0].fieldGroup[0].fieldGroup[1].templateOptions.options = this.ItemCategory?.find(v => $event === v?.categoryId)?.itemSubcategories?.map(v => ({ label: v?.subcategoryName, value: v?.itemSubcategoryId }))
                    },
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
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'caseNumber',
                  type: 'input',
                  defaultValue: this.productDetails?.caseNumber,
                  templateOptions: {
                    label: this._translateService.instant('casNo'),
                    required: true,
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
                  },
                },
                {
                  className: 'col-12',
                  key: 'itemKeywords',
                  type: 'chips',
                  defaultValue: this.productDetails?.itemKeywords?.map(v => (v?.keyword)),
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
                    file: this.productDetails?.attachment?.reference,
                  }
                },
                {
                  className: 'col-12',
                  key: 'details',
                  type: 'textarea',
                  defaultValue: this.productDetails?.details,
                  templateOptions: {
                    label: this._translateService.instant('this.productDetails'),
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
                  templateOptions: {
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
                  type: 'number',
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
                  type: 'input',
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
                  key: 'Certificate',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Certificates'),
                    options: res[10]?.map(v => ({ label: v?.certificateTypeName, value: v }))
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.CertificateName,
                    className: `model.Certificate?.certificateTypeId ===6? 'col-md-3' : 'col-md-6'`
                  },

                },
                {
                  className: 'col-md-3 col-12',
                  key: 'CertificateName',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('CertificateName'),
                  },
                  hideExpression: "model.Certificate?.certificateTypeId !== 6"

                },
                {
                  className: 'col-md-3 col-12 p-0 mt-md-4 noFormGroup floatValidation',
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
                    'templateOptions.required': () => this.model.Certificate,
                  },
                },
                {
                  className: 'col-md-2 col-12',
                  type: 'button',
                  templateOptions: {
                    icon: 'add.svg',
                    btnType: 'success p-2 mt-md-4',
                    onClick: ($event: any) => {
                      this.uploadNewFile = true
                      this.productCertificates.push({ Certificate: this.model?.Certificate, otherCertificateName: this.model?.CertificateName, file: this.model.UploadProductCertificate })
                      this.model.uploadAreaCertificate = [...this.model.uploadAreaCertificate, { Certificate: this.model?.Certificate, otherCertificateName: this.model?.CertificateName, file: this.model.UploadProductCertificate }]


                      this.form.get('Certificate')?.setValue(undefined)
                      this.form.get('Certificate')?.reset()
                      this.form.get('CertificateName')?.setValue(undefined)
                      this.form.get('CertificateName')?.reset()
                      this.form.get('UploadProductCertificate')?.setValue(undefined)


                    },
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.Certificate || !this.model.UploadProductCertificate,
                  },
                },

                {
                  className: 'col-12',
                  key: 'uploadAreaCertificate',
                  type: 'uploadArea',
                  templateOptions: {
                    items: this.productCertificates,
                    productId: this.productId,
                    type: 'certificate'
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
                    required: true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'storageTradeInformation',
                  type: 'input',
                  defaultValue: this.productDetails?.storageTradeInformation,
                  templateOptions: {
                    label: this._translateService.instant('Storage'),
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
                  defaultValue: this.productDetails?.itemPricings?.map(v => (
                    {
                      from: { value: v?.fromQuantity, type: v?.fromUom },
                      to: { value: v?.toQuantity, type: v?.toUom },
                      price: { value: v?.price, type: v?.currency }
                    }
                  )),
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
                  defaultValue: this.productDetails?.paymentTerms?.map(v => (v?.paymentTermId)),
                  templateOptions: {
                    required: true,
                    label: this._translateService.instant('PaymentTerms'),
                    options: res[8]?.map(v => ({ label: v?.paymentTermName, value: v?.paymentTermId })),
                    multiple: true,
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
                  defaultValue: this.productDetails?.itemSampleType && this.productDetails?.sampleSize && this.productDetails?.sampleUnit ? true : false,
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
                  defaultValue: this.productDetails?.itemSampleType?.itemSampleTypesId,
                  templateOptions: {
                    label: this._translateService.instant('sampleType'),
                    required: true,
                    options: res[5]?.map(v => ({ label: v?.itemSampleTypesName, value: v?.itemSampleTypesId })),
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
                  defaultValue: this.productDetails?.sampleSize,
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
                  defaultValue: this.productDetails?.sampleUnit?.uomId,
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
                    }
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
                    }
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
                  defaultValue: this.productDetails?.incoterms?.map(v => (v?.incotermId)),
                  templateOptions: {
                    label: this._translateService.instant('Incoterms'),
                    options: res[6]?.map(v => ({ label: v?.incotermShortName, value: v?.incotermId })),
                    multiple: true
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
                  key: 'ShippingCertificate',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('Certificates'),
                    options: res[11]?.map(v => ({ label: v?.certificateTypeName, value: v }))
                  },
                  expressionProperties: {
                    'templateOptions.required': () => this.model.ShippingCertificateName,
                    className: `model.ShippingCertificate?.certificateTypeId ===8? 'col-md-3' : 'col-md-6'`
                  },

                },
                {
                  className: 'col-md-3 col-12',
                  key: 'ShippingCertificateName',
                  type: 'input',
                  templateOptions: {
                    label: this._translateService.instant('CertificateName'),
                  },
                  hideExpression: "model.ShippingCertificate?.certificateTypeId !== 8"

                },
                {
                  className: 'col-md-3 col-12 p-0 mt-md-4 noFormGroup floatValidation',
                  key: 'UploadShippingCertificate',
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
                    'templateOptions.required': () => this.model.Certificate,
                  },
                },
                {
                  className: 'col-md-2 col-12',
                  type: 'button',
                  templateOptions: {
                    icon: 'add.svg',
                    btnType: 'success p-2 mt-md-4',
                    onClick: ($event: any) => {
                      this.uploadNewFile = true
                      this.ShippingCertificate.push({ Certificate: this.model?.ShippingCertificate, otherCertificateName: this.model?.ShippingCertificateName, file: this.model.UploadShippingCertificate })
                      this.model.uploadAreaShipping = [...this.model.uploadAreaShipping, { Certificate: this.model?.ShippingCertificate, otherCertificateName: this.model?.ShippingCertificateName, file: this.model.UploadShippingCertificate }]



                      this.form.get('ShippingCertificate')?.setValue(undefined)
                      this.form.get('ShippingCertificate')?.reset()
                      this.form.get('ShippingCertificateName')?.setValue(undefined)
                      this.form.get('ShippingCertificateName')?.reset()
                      this.form.get('UploadShippingCertificate')?.setValue(undefined)


                    },
                  },
                  expressionProperties: {
                    'templateOptions.disabled': () => !this.model.ShippingCertificate || !this.model.UploadShippingCertificate,
                  },
                },

                {
                  className: 'col-12',
                  key: 'uploadAreaShipping',
                  type: 'uploadArea',
                  templateOptions: {
                    items: this.ShippingCertificate,
                    productId: this.productId,
                    type: 'shippingCertificate'
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

              ],
            },

          ],
        }
      ]
      // if(this.productId){
      //   this.model.itemCategory = this.productDetails?.itemCategory?.categoryId;
      //   this.model.itemSubcategory =  this.productDetails?.itemSubcategory?.itemSubcategoryId

      // }
    })
    this.unSubscription.push(forkSub);


    this.UploadFileService.resData.subscribe(res => {
      let addItemStorage
      var Values = [];
      //get olds values
      if (window.localStorage.getItem('addItemStorage')) {
        addItemStorage = window.localStorage.getItem('addItemStorage')
        Values = JSON.parse(addItemStorage);
      }

      //push new value
      Values.push(res);

      window.localStorage.setItem('addItemStorage', JSON.stringify(Values))

      if (JSON.parse(window.localStorage.getItem('addItemStorage'))?.length === this.beforeImagesLoaded?.length) {
        let finalUploaded = JSON.parse(window.localStorage.getItem('addItemStorage'))
        let productPicture: {};
        let productCertificates = []
        let productShippingCertificates = []
        // let SupplementsFiles = []
        finalUploaded.forEach(element => {
          if (element.includes('/picture/')) {
            productPicture = {
              attachmentSource: {
                attachmentSourceId: 1,
                attachmentSourceName: element
              },

              reference: element
            }
          }
          else if (element.includes('/certificate/')) {
            productCertificates.push(element)
          }
          else if (element.includes('/shippingCertificate/')) {
            productShippingCertificates.push(element)
          }
          else {

            // SupplementsFiles.push(element)

          }

        });

        let finalProductCertificates: any = []
        let finalProductShippingCertificates = []
        // let finalSupplementsFiles = []
        if (productCertificates?.length) {
          productCertificates.forEach((element, index) => {
            finalProductCertificates.push({
              attachment: {
                attachmentSource: {
                  "attachmentSourceId": index + 1,
                  attachmentSourceName: element
                },
                reference: element
              },
              certificateType: {
                certificateLevel: this.model?.uploadAreaCertificate[index]?.Certificate?.certificateLevel,
                certificateTypeId: this.model?.uploadAreaCertificate[index]?.Certificate?.certificateTypeId,
                certificateTypeName: this.model?.uploadAreaCertificate[index]?.Certificate?.certificateTypeName
              },
              itemCertificateName: this.model?.uploadAreaCertificate[index]?.Certificate?.certificateTypeId === 6 ? this.model?.uploadAreaCertificate[index]?.otherCertificateName : this.model?.uploadAreaCertificate[index]?.Certificate?.certificateTypeName
            })

          })



        }
        if (this.productDetails?.itemCertificateDtos?.length) {
          let oldProductCertificates = []


          this.productDetails?.itemCertificateDtos?.forEach(v => {
            oldProductCertificates.push({
              attachment: {
                attachmentSource: {
                  "attachmentSourceId": v?.attachment?.attachmentSource?.attachmentSourceId,
                  attachmentSourceName: v?.attachment?.attachmentSource?.attachmentSourceName,
                },
                reference: v?.attachment?.reference,
              },
              certificateType: {
                certificateLevel: v?.certificateType?.certificateLevel,
                certificateTypeId: v?.certificateType?.certificateTypeId,
                certificateTypeName: v?.certificateType?.certificateTypeName,
              },
              itemCertificateName: v?.itemCertificateName
            })
          })
          finalProductCertificates = [...oldProductCertificates, ...finalProductCertificates]

        }
        if (productShippingCertificates?.length) {
          productShippingCertificates.forEach((element, index) => {
            finalProductShippingCertificates.push({
              attachment: {
                attachmentSource: {
                  "attachmentSourceId": index + 1,
                  attachmentSourceName: element
                },
                reference: element
              },

              certificateType: {
                certificateLevel: this.model?.uploadAreaShipping[index]?.Certificate?.certificateLevel,
                certificateTypeId: this.model?.uploadAreaShipping[index]?.Certificate?.certificateTypeId,
                certificateTypeName: this.model?.uploadAreaShipping[index]?.Certificate?.certificateTypeName
              },
              itemCertificateName: this.model?.uploadAreaShipping[index]?.Certificate?.certificateTypeId === 8 ? this.model?.uploadAreaShipping[index]?.otherCertificateName : this.model?.uploadAreaShipping[index]?.Certificate?.certificateTypeName
            })


          })


        }
        if (this.productDetails?.shippingCertificateDtos?.length) {
          let oldShippingCertificate = []
          this.productDetails?.shippingCertificateDtos?.forEach(v => {
            oldShippingCertificate.push({
              attachment: {
                attachmentSource: {
                  "attachmentSourceId": v?.attachment?.attachmentSource?.attachmentSourceId,
                  attachmentSourceName: v?.attachment?.attachmentSource?.attachmentSourceName,
                },
                reference: v?.attachment?.reference,
              },
              certificateType: {
                certificateLevel: v?.certificateType?.certificateLevel,
                certificateTypeId: v?.certificateType?.certificateTypeId,
                certificateTypeName: v?.certificateType?.certificateTypeName,
              },
              itemCertificateName: v?.itemCertificateName
            })
          })
          finalProductShippingCertificates = [...oldShippingCertificate, ...finalProductShippingCertificates]

        }

        // if (SupplementsFiles?.length) {
        //   SupplementsFiles.forEach((element, index) => {
        //     finalSupplementsFiles.push({
        //       attributeName: this.model?.itemSuppliments[index]?.attributeName,
        //       attributeValue: element
        //     })


        //   })

        //

        //   if (this.productDetails?.itemSuppliments?.length > 0) {
        //     alert(true)
        //     let oldItemSuppliments =[]
        //     this.productDetails?.itemSuppliments?.forEach(v =>{
        //
        //       oldItemSuppliments.push({
        //           attributeName:v?.attributeName,
        //         attributeValue: v?.attributeValue
        //       })
        //     })
        //     finalSupplementsFiles = [...oldItemSuppliments, ...finalSupplementsFiles]

        //   }

        // }
        console.log(finalProductCertificates);
        console.log(finalProductShippingCertificates);
        this.updateAttachment(productPicture, finalProductCertificates, finalProductShippingCertificates)


      }



    })


    this._sharedService.removeIndexFromUploadArea.subscribe(res => {
      if (res) {

        if (res?.item?.file?.src.includes('/certificate/')) {
          this.productDetails.itemCertificateDtos.splice(res?.index, 1)

        } else if (res?.item?.file?.src.includes('/shippingCertificate/')) {
          this.productDetails.shippingCertificateDtos.splice(res?.index, 1)
        }

        this.UploadFileService.deleteFile(res?.item?.file?.src)
        this.updateAttachment(this.productDetails.attachment, this.productDetails.itemCertificateDtos, this.productDetails.shippingCertificateDtos,'removedSuccessfully')
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

  updateAttachment(itemPicture, itemCertificateDtos, shippingCertificateDtos,message?) {
    let body: ItemAttachmentsDto = {
      attachment: itemPicture ? itemPicture : undefined,
      itemCertificateDtos: itemCertificateDtos?.length ? itemCertificateDtos : [],
      shippingCertificateDtos: shippingCertificateDtos?.length ? shippingCertificateDtos : [],
      itemSuppliments: this.model?.itemSuppliments ? this.model?.itemSuppliments : []
    }
    this._itemControllerService.updateItemAttachmentsUsingPUT(body, this.productId).subscribe((res: ItemDto) => {

      this.toaster.success(this._translateService.instant( message ?message :'SuccessfullyDone' ))
      if(this.productId){
        this.options.resetModel()
        this._sharedService.dropzoneEmptySubj.next(true)
      }
    })
  }

  onSubmit() {

    // this.isSubmit = true;


    function SupplementsExistFile(arr) {
      return arr.some(function (el) {
        if (el.UploadFile) {
          return true;
        }

      });
    }

    let itemDto: ItemDto = {
      attachment: !this.uploadNewFile ? this.productDetails?.attachment : undefined,
      advantage: this.model?.advantage,
      appearence: this.model?.appearence,
      application: this.model?.application,
      caseNumber: this.model?.caseNumber,
      details: this.model?.details,
      dissolutionRate: this.model?.dissolutionRate && this.model?.hour ? `${this.model?.hour}hr/${this.model?.dissolutionRate}%` : undefined,
      escherichiaColi: this.model?.escherichiaColi,
      estimatedDeliveryLeadTime: `${this.model?.estimatedDeliveryLeadTime}${this.model?.Period}`,
      expiryDate: new Date(this.model?.expiryDate),
      form: this.model?.form,
      heavyMetal: this.model?.heavyMetal,
      incoterms: this.incotermsArr?.filter((item) => {
        return this.model?.incoterms?.includes(item?.incotermId)
      }),
      indotoxinTest: this.model?.indotoxinTest,
      injection: this.model?.injection,
      itemCategory: {
        categoryId: +this.model?.itemCategory
      },
      itemCertificateDtos: !this.uploadNewFile ? this.productDetails?.itemCertificateDtos : [],
      shippingCertificateDtos: !this.uploadNewFile ? this.productDetails?.shippingCertificateDtos : [],
      itemKeywords: this.model?.itemKeywords?.map(v => ({ keyword: v?.name || v })),
      itemName: this.model?.itemName,
      itemPricings: this.model?.productPrices?.map(v => ({
        fromQuantity: +v?.from?.value,
        fromUom: { uomId: +v?.from?.type?.uomId },
        toQuantity: +v?.to?.value,
        toUom: { uomId: +v?.to?.type?.uomId },
        price: +v?.price?.value,
        currency: { currencyId: +v?.price?.type?.currencyId }
      })),
      itemSampleType: this.model?.itemSampleType ? this.ItemSampleTypeArr?.find(v => v?.itemSampleTypesId === this.model?.itemSampleType) : undefined,
      itemSubcategory: this.model?.itemSubcategory ? { itemSubcategoryId: this.model?.itemSubcategory } : undefined,
      itemSuppliments: this.model?.itemSuppliments ? this.model?.itemSuppliments?.map((v, i) => ({
        attributeName: v?.attributeName,
        attributeValue: v?.attributeValue,
        itemSupplimentId: i + 1
      })) : [],
      lossOnDrying: +this.model?.lossOnDrying,
      meltingRange: +this.model?.meltingRange,
      micronization: this.model?.micronization,
      minOrderQuantity: +this.model?.minOrderQuantity,
      molFormula: this.model?.molFormula,
      opticalRotation: +this.model?.opticalRotation,
      origin: this.model?.origin ? { originId: +this.model?.origin } : undefined,
      packaging: this.model?.packaging,
      particleSize: this.model?.particleSize,
      paymentTerms: this.PaymentTermsArr?.filter((item) => {
        return this.model?.paymentTerms?.includes(item?.paymentTermId)
      })?.map(v => ({ paymentTermName: v?.paymentTermName, status: true })),
      ph: +this.model?.ph,
      portOfDispatching: this.model?.portOfDispatching,
      productionCapacity: this.model?.productionCapacity ? `${this.model?.productionCapacity}${this.model?.ProductionCapacityUnit}/${this.model?.Period}` : undefined,
      purity: this.model?.purity ? `${this.model?.purity}%` : undefined,
      relatedSubstance: this.model?.relatedSubstance,
      residualSolvents: +this.model?.residualSolvents,
      residueIgnition: +this.model?.residueIgnition,
      salmonelaSpecies: this.model?.salmonelaSpecies,
      sampleSize: this.model?.sampleSize ? +this.model?.sampleSize : undefined,
      sampleUnit: this.model?.sampleUnit ? { uomId: +this.model?.sampleUnit, } : undefined,
      status: 0,
      storage: this.model?.storage,
      supplier: this.userData?.supplierId ? { supplierId: +this.userData?.supplierId } : undefined,
      supplierCategory: this.model?.supplierCategory ? this.supplierCategory.find(v => v?.categoryId === this.model?.supplierCategory) : undefined,
      totalVac: this.model?.totalVac ? `${this.model?.totalVac}cfu/gm` : undefined,
      totalYamc: this.model?.totalYamc ? `${this.model?.totalYamc}cfu/gm` : undefined,
      transportation: this.model?.transportation ? this.TransportationArr?.find(v => v?.transportationId === this.model?.transportation) : undefined,
      uom: this.model?.uom ? { uomId: +this.model?.uom } : undefined,

      storageTradeInformation: this.model?.storageTradeInformation,
      itemId: this.productId ? +this.productId : undefined
    }

    if (this.productId) {
      // itemDto.itemSuppliments =  !this.uploadNewFile4? this.productDetails?.itemSuppliments : [];

      const addItemUsingPOSTSub = this._itemControllerService.updateItemUsingPUT(itemDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: ItemDto) => {
        if (res) {
          window.localStorage.removeItem('addItemStorage')
          this.beforeImagesLoaded = []

          if (this.model?.attachment?.length) {
            this.beforeImagesLoaded?.push(this.model?.attachment[0])
            this.UploadFileService.uploadMultiple([this.model?.attachment[0]], `products/product-${res?.itemId}/picture`)
          }

          if (this.model?.uploadAreaCertificate?.length) {
            let uploadCertificate = []
            this.model?.uploadAreaCertificate?.forEach(element => {
              if (element?.file?.fileToUpload) {
                this.beforeImagesLoaded.push(element?.file?.fileToUpload)
                uploadCertificate.push(element?.file?.fileToUpload)
              }

            });
            this.UploadFileService.uploadMultiple(uploadCertificate, `products/product-${res?.itemId}/certificate`)
          }

          if (this.model?.uploadAreaShipping.length) {
            let uploadShippingCertificate = []
            this.model?.uploadAreaShipping?.forEach(element => {
              if (element?.file?.fileToUpload) {
                this.beforeImagesLoaded.push(element?.file?.fileToUpload)
                uploadShippingCertificate.push(element?.file?.fileToUpload)
              }
            });
            this.UploadFileService.uploadMultiple(uploadShippingCertificate, `products/product-${res?.itemId}/shippingCertificate`)
          }

          // if (this.model?.itemSuppliments.length) {
          //   if (SupplementsExistFile(this.model?.itemSuppliments)) {
          //     let uploadItemSuppliments = []
          //     this.model?.itemSuppliments?.forEach(element => {
          //       if (element?.UploadFile) {
          //         let file = element?.UploadFile
          //         let fileToUpload: any;
          //         fileToUpload = file.item(0);
          //         this.beforeImagesLoaded.push(fileToUpload)
          //         uploadItemSuppliments.push(fileToUpload)

          //       }
          //     });
          //     this.UploadFileService.uploadMultiple(uploadItemSuppliments, `products/product-${res?.itemId}/Supplements`)
          //   }

          // }

          if(!this.model?.attachment?.length && !this.model?.uploadAreaCertificate?.length && !this.model?.uploadAreaShipping?.length){
            this.toaster.success(this._translateService.instant( 'SuccessfullyDone' ))
          }
        }

      })
      this.unSubscription.push(addItemUsingPOSTSub)
    } else {
      const addItemUsingPOSTSub = this._itemControllerService.addItemUsingPOST(itemDto).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: ItemDto) => {
        if (res) {
          this.productId = res?.itemId
          window.localStorage.removeItem('addItemStorage')
          this.beforeImagesLoaded = []

          if (this.model?.attachment?.length) {
            this.beforeImagesLoaded?.push(this.model?.attachment[0])
            this.UploadFileService.uploadMultiple([this.model?.attachment[0]], `products/product-${res?.itemId}/picture`)
          }

          if (this.model?.uploadAreaCertificate?.length) {
            let uploadCertificate = []
            this.model?.uploadAreaCertificate?.forEach(element => {
              if (element?.file?.fileToUpload) {
                this.beforeImagesLoaded.push(element?.file?.fileToUpload)
                uploadCertificate.push(element?.file?.fileToUpload)
              }

            });
            this.UploadFileService.uploadMultiple(uploadCertificate, `products/product-${res?.itemId}/certificate`)
          }

          if (this.model?.uploadAreaShipping.length) {
            let uploadShippingCertificate = []
            this.model?.uploadAreaShipping?.forEach(element => {
              if (element?.file?.fileToUpload) {
                this.beforeImagesLoaded.push(element?.file?.fileToUpload)
                uploadShippingCertificate.push(element?.file?.fileToUpload)
              }
            });
            this.UploadFileService.uploadMultiple(uploadShippingCertificate, `products/product-${res?.itemId}/shippingCertificate`)
          }

          // if (this.model?.itemSuppliments.length) {
          //   if (SupplementsExistFile(this.model?.itemSuppliments)) {
          //     let uploadItemSuppliments = []
          //     this.model?.itemSuppliments?.forEach(element => {
          //       if (element?.UploadFile) {
          //         let file = element?.UploadFile
          //         let fileToUpload: any;
          //         fileToUpload = file.item(0);
          //         this.beforeImagesLoaded.push(fileToUpload)
          //         uploadItemSuppliments.push(fileToUpload)

          //       }
          //     });
          //     this.UploadFileService.uploadMultiple(uploadItemSuppliments, `products/product-${res?.itemId}/Supplements`)
          //   }

          // }
        }

      })
      this.unSubscription.push(addItemUsingPOSTSub)
    }







  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.localStorage.removeItem('addItemStorage')
  }
}
