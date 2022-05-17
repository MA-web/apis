import { Component, OnInit } from '@angular/core';
import { forkJoin, take } from 'rxjs';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-inquiry-filling',
  templateUrl: './inquiry-filling.component.html',
  styleUrls: ['./inquiry-filling.component.scss']
})
export class InquiryFillingComponent extends AppBaseComponent implements OnInit {

  productCertificates: any[] = [
    { CertificateName: 'Certificate Name 01', file: 'https://via.placeholder.com/600' },
    { CertificateName: 'Certificate Name 02', file: 'https://via.placeholder.com/600' }
  ]

  ShippingCertificate: any[] = [
    { CertificateName: 'Certificate Name 01', file: 'https://via.placeholder.com/600' },
    { CertificateName: 'Certificate Name 02', file: 'https://via.placeholder.com/600' }
  ]

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Deals') },
      { label: '#Inquiry - 12666532' },
      { label: this._translateService.instant('InquiryFilling'), active: true },

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
                  options: [],
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SubCategory',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SubCategory'),
                  required: true,
                  options: [],
                  disabled: true
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
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'casNo',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('casNo'),
                  required: true,
                  disabled: true
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
                  options: [],
                  disabled: true
                },
              },
              {
                className: 'col-12',
                key: 'keywords',
                type: 'chips',
                defaultValue: ['Javascript', 'Typescript'],
                templateOptions: {
                  label: this._translateService.instant('keywords'),
                  requestAutocompleteItemsFake: ['item1', 'item2', 'item3'],
                  disable: true
                },
              },
              // {
              //   className: 'col-12',
              //   key: 'ProductPicture',
              //   type: 'upload',
              //   templateOptions: {
              //     label: this._translateService.instant('ProductPicture'),
              //   }
              // },
              {
                className: 'col-12',
                key: 'ProductDetails',
                type: 'textarea',
                templateOptions: {
                  label: this._translateService.instant('ProductDetails'),
                  rows: 5,
                  disabled: true
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
                key: 'ProductAttributeStorage',
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
                  rows: 5,
                  disabled: true
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
          /*****************************ProductCertificates************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('ProductCertificates'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row align-items-center',
            fieldGroup: [
              // {
              //   className: 'col-md-6 col-12',
              //   key: 'CertificateName',
              //   type: 'select',
              //   templateOptions: {
              //     label: this._translateService.instant('CertificateName'),
              //     required: true,
              //     options: [
              //       { label: "c1", value: "c1" },
              //       { label: "c2", value: "c2" }
              //     ]
              //   },
              // },
              // {
              //   className: 'col-md-3 col-12 p-0 mt-md-3',
              //   key: 'UploadProductCertificate',
              //   type: 'file',
              //   templateOptions: {
              //     label: this._translateService.instant('UploadCertificate'),
              //     required: true,
              //     change: (filed, $event) => {

              //       let file = $event.target.files
              //       let fileToUpload: any;
              //       fileToUpload = file.item(0);
              //       let reader = new FileReader();
              //       reader.onload = (event: any) => {
              //         this.model.UploadProductCertificate = { src: event.target.result, fileToUpload: fileToUpload }
              //       }
              //       reader.readAsDataURL(fileToUpload);
              //     }
              //   },
              // },
              // {
              //   className: 'col-md-2 col-12',
              //   type: 'button',
              //   templateOptions: {
              //     icon: 'add.svg',
              //     btnType: 'success px-3 mt-md-4',
              //     onClick: ($event: any) => {
              //       this.productCertificates.push({ CertificateName: this.model?.CertificateName, file: this.model.UploadProductCertificate })
              //       this.model.uploadAreaProducts = this.productCertificates
              //       this.form.get('CertificateName')?.setValue(undefined)
              //       this.form.get('CertificateName')?.reset()
              //       this.form.get('UploadProductCertificate')?.setValue(undefined)

              //     },
              //   },
              //   expressionProperties: {
              //     'templateOptions.disabled': () => !this.model.CertificateName || !this.model.UploadProductCertificate,
              //   },
              // },

              {
                className: 'col-12',
                key: 'uploadAreaProducts',
                type: 'uploadArea',
                templateOptions: {
                  items: this.productCertificates,
                  fileLoad: true
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
                key: 'MinimumOrderQuantity',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('MinimumOrderQuantity'),
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Unit',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Unit'),
                  options: [],
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'InsertTradeInformationStorage',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Storage'),
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'TradeInformationValidPeriod',
                type: 'input',
                templateOptions: {
                  type: 'date',
                  label: this._translateService.instant('ValidPeriod'),
                  disabled: true
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
                defaultValue: [
                  {
                    "from": {
                      "value": "2",
                      "type": "gram"
                    },
                    "to": {
                      "value": "2",
                      "type": "k"
                    },
                    "price": {
                      "value": "2",
                      "type": "USD"
                    }
                  }
                ],
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
                          type: 'select',
                          templateOptions: {
                            required: true,
                            options: [
                              { label: "gram", value: "gram" },
                              { label: "k", value: "k" }
                            ]
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
                          type: 'select',
                          templateOptions: {
                            required: true,
                            options: [
                              { label: "gram", value: "gram" },
                              { label: "k", value: "k" }
                            ]
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
                          type: 'select',
                          templateOptions: {
                            required: true,
                            options: [
                              { label: "USD", value: "USD" },
                              { label: "EGP", value: "EGP" }
                            ]
                          },
                        },
                      ],
                    },

                  ]
                }
              },
              // {
              //   className: 'col-12',
              //   key: 'PaymentTerms',
              //   type: 'select',
              //   templateOptions: {
              //     required: true,
              //     label: this._translateService.instant('PaymentTerms'),
              //     options: [ ]
              //   },
              // },
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
                key: 'sampleType',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('sampleType'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SampleSize',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SampleSize'),
                  required: true,
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SampleUnit',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('SampleUnit'),
                  required: true,
                  options: []
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
                key: 'Port_of_Discharge',
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
                key: 'Value',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('Value'),
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'ProductionCapacityUnit',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Unit'),
                  options: [],
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Period',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Period'),
                  options: [],
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'EstimatedLeadTime',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('EstimatedLeadTime'),
                  disabled: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Package',
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
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Incoterms'),
                  options: []
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Transportation',
                type: 'select',
                templateOptions: {
                  label: this._translateService.instant('Transportation'),
                  options: []
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
              // {
              //   className: 'col-md-6 col-12',
              //   key: 'ShippingCertificateName',
              //   type: 'select',
              //   templateOptions: {
              //     label: this._translateService.instant('CertificateName'),
              //     required: true,
              //     options: [
              //       { label: "c1", value: "c1" },
              //       { label: "c2", value: "c2" }
              //     ]
              //   },
              // },
              // {
              //   className: 'col-md-3 col-12 p-0 mt-md-3',
              //   key: 'UploadShippingCertificate',
              //   type: 'file',
              //   templateOptions: {
              //     label: this._translateService.instant('UploadCertificate'),
              //     required: true,
              //     change: (filed, $event) => {

              //       let file = $event.target.files
              //       let fileToUpload: any;
              //       fileToUpload = file.item(0);
              //       let reader = new FileReader();
              //       reader.onload = (event: any) => {
              //         this.model.UploadShippingCertificate = { src: event.target.result, fileToUpload: fileToUpload }
              //       }
              //       reader.readAsDataURL(fileToUpload);
              //     }
              //   },
              // },
              // {
              //   className: 'col-md-2 col-12',
              //   type: 'button',
              //   templateOptions: {
              //     icon: 'add.svg',
              //     btnType: 'success px-3 mt-md-4',
              //     onClick: ($event: any) => {
              //       this.ShippingCertificate.push({ CertificateName: this.model?.ShippingCertificateName, file: this.model.UploadShippingCertificate })

              //       this.model.uploadAreaShipping =  this.ShippingCertificate

              //       this.form.get('ShippingCertificateName')?.setValue(undefined)
              //       this.form.get('ShippingCertificateName')?.reset()
              //       this.form.get('UploadShippingCertificate')?.setValue(undefined)

              //     },
              //   },
              //   expressionProperties: {
              //     'templateOptions.disabled': () => !this.model.ShippingCertificateName || !this.model.UploadShippingCertificate,
              //   },
              // },

              {
                className: 'col-12',
                key: 'uploadAreaShipping',
                type: 'uploadArea',
                templateOptions: {
                  items: this.ShippingCertificate,
                  fileLoad: true
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
                key: 'InsertSupplement',
                templateOptions: {
                  columnLevel: false,
                  textAdd: this._translateService.instant('Insert'),
                },
                fieldArray: {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      className: 'col-md-3 col-12',
                      key: 'Attribute',
                      type: 'input',
                      templateOptions: {
                        label: this._translateService.instant('Attribute'),
                        required: true
                      },
                    },
                    {
                      className: 'col-md-3 col-12',
                      key: 'Value',
                      type: 'input',
                      templateOptions: {
                        label: this._translateService.instant('Value'),
                        required: true
                      },
                    },
                    {
                      className: 'col-md-3 col-12 mt-md-4',
                      key: 'UploadFile',
                      type: 'file',
                      templateOptions: {
                        text: this._translateService.instant('UploadFile'),
                      },
                    },
                  ]
                }
              },
              {
                className: 'col-12',
                key: 'Extra_point_discussion',
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


    // let productCertificates = [
    //   {CertificateName:'Certificate Name 01' , file:'assets/img/molecular-structure.png'},
    //   {CertificateName:'Certificate Name 02' , file:'assets/img/molecular-structure.png'}
    // ]

    // let observables:any = []
    // productCertificates.forEach(element => {
    //     observables.push(this._sharedService.getBlob(element.file))
    // });
    // forkJoin(observables).pipe(take(1)).subscribe((res: any) => {
    //   console.log('res: ', res);

    // })

    // this.productCertificates = [{ CertificateName:'Certificate Name 01', file: ''}]
  }
  onSubmit() {

    console.log(this.form);
    console.log(this.model);
  }
}

