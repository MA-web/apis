import { Component, Injector, OnInit } from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { ItemControllerService, ItemPaymentTermDto, QuotationControllerService, QuotationResponseDto, QuotationVersionDto, QuotationVersionReplyDto, QuotationVersionRequestDto, UomDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';
@Component({
  selector: 'app-quotation-reply',
  templateUrl: './quotation-reply.component.html',
  styleUrls: ['./quotation-reply.component.scss']
})
export class QuotationReplyComponent extends AppBaseComponent implements OnInit {

  productId: number;
  dealId: number;

  units: Array<UomDto> = []
  PaymentTermsArr: Array<ItemPaymentTermDto> = []

  quotationDetails:QuotationResponseDto
  constructor(
    Injector: Injector,
    private _quotationControllerService: QuotationControllerService,
    private _itemControllerService: ItemControllerService,
  ) {
    super(Injector)
    this.route.params.subscribe(param => {

      this.dealId = +this.route.snapshot['_urlSegment'].segments[3]
      this.productId = +this.route.snapshot['_urlSegment'].segments[4]
    })
  }

  async ngOnInit() {
    this._sharedService.sendQuotationsReplies.subscribe((res:QuotationResponseDto) =>{
      console.log('res: ', res);
      this.quotationDetails = res
    })
    await this._translateService.get('dummyTranslation').toPromise().then();
    let observables: any = [
      this.LookupControllerService.getUnitOfMeasureUsingGET(),
      this.LookupControllerService.getCurrenciesUsingGET(),
      this._itemControllerService.getItemPaymentTermsUsingGET(this.productId),
    ]

    if (this.productId) {
      observables.push(this._itemControllerService.getItemByItemIdUsingGET(this.productId))
    }

    const forkSub = forkJoin(observables).subscribe((res: any) => {
      this.units = res[0] ? res[0] : []
      this.PaymentTermsArr = res[2] ? res[2] : []
  

      this.fields = [
        {
          type: 'accordion',
          fieldGroup: [
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
                  className: 'col-md-4 col-12  px-md-2',
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
                        options: this.units?.map(v => ({ label: v?.uomShortName, value: v })),
                      }
                    },
                  ],
                },

                {
                  className: 'col-md-4 col-12  pr-md-2',
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
                        options: res[1]?.map(v => ({ label: v?.currencyCode, value: v })),
                      },
                    },
                  ],
                }, {
                  className: 'col-md-4 col-12 pr-md-2',
                  key: 'PaymentTerms',
                  type: 'ng-select',
                  templateOptions: {
                    label: this._translateService.instant('PaymentTerms'),
                    required: true,
                    options: res[2]?.map(v => ({ label: v?.paymentTerm?.paymentTermName, value: v })),
                  },

                },

              ],
            },

            /*****************************TermsAnfConditions************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('TermsAnfConditions'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'termsConditions',
                  type: 'textarea',
                  defaultValue:this.quotationDetails?.quotationVersions[this.quotationDetails?.quotationVersions?.length-1]?.termsConditions,
                  templateOptions: {
                    placeholder: this._translateService.instant('TermsAnfConditions'),
                    rows: 5,
                    required:true
                  },
                },
              ],
            },
            /*****************************SpecialPrecaution************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('SpecialPrecaution'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'specialPrecaution',
                  type: 'textarea',
                  defaultValue:this.quotationDetails?.quotationVersions[this.quotationDetails?.quotationVersions?.length-1]?.specialPrecaution,
                  templateOptions: {
                    placeholder: this._translateService.instant('SpecialPrecaution'),
                    rows: 5,
                    required:true
                  },
                },
              ],
            },
            /*****************************ShipmentIncludedDocuments************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('ShipmentIncludedDocuments'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12',
                  key: 'shipmentIncludedDocuments',
                  type: 'textarea',
                  defaultValue:this.quotationDetails?.quotationVersions[this.quotationDetails?.quotationVersions?.length-1]?.shipmentIncludedDocuments,
                  templateOptions: {
                    placeholder: this._translateService.instant('ShipmentIncludedDocuments'),
                    rows: 5,
                    required:true
                  },
                },
              ],
            },
            /*****************************BankAccount************************************* */
            {
              templateOptions: {
                label: this._translateService.instant('BankAccount'),
                required: true,
                open: true
              },
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-md-6 col-12',
                  key: 'beneficiaryName',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.beneficiaryBankName,
                  templateOptions: {
                    label: this._translateService.instant('BeneficiaryName'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'beneficiaryPhone',
                  type: 'phone',
                  defaultValue:this.quotationDetails?.bankAccount?.beneficiaryPhone,
                  templateOptions: {
                    label: this._translateService.instant('Phone'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'beneficiaryBankName',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.beneficiaryBankName,
                  templateOptions: {
                    label: this._translateService.instant('BeneficiaryBankName'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'beneficiaryAccountNumber',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.beneficiaryAccountNumber,
                  templateOptions: {
                    label: this._translateService.instant('BeneficiaryAccountNumber'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'swiftCode',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.swiftCode,
                  templateOptions: {
                    label: this._translateService.instant('SWIFTCode'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-md-6 col-12',
                  key: 'iban',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.iban,
                  templateOptions: {
                    label: this._translateService.instant('IBAN'),
                    required: true,
                    disabled:true
                  },
                },
                {
                  className: 'col-12',
                  key: 'intermediateBank',
                  type: 'input',
                  defaultValue:this.quotationDetails?.bankAccount?.intermediateBank,
                  templateOptions: {
                    label: this._translateService.instant('IntermediateBankAndData'),
                    required: true,
                    disabled:true
                  },
                },
              ],
            },


          ],
        }
      ]
    })


  }
  onSubmit() {
    this.isSubmit = true;
    let body: QuotationVersionReplyDto = {
      currency:{
        currencyId:this.model?.price?.type?.currencyId,
        currencyCode:this.model?.price?.type?.currencyCode,
        currencyName:this.model?.price?.type?.currencyName
      },
      finalPrice:+this.model?.price?.value,
      finalQuantity:+this.model?.quantity?.value,
      shipmentIncludedDocuments: this.model?.shipmentIncludedDocuments,
      specialPrecaution: this.model?.specialPrecaution,
      termsConditions: this.model?.termsConditions,
      uom:{
        uomId:this.model?.quantity?.type?.uomId,
        uomName:this.model?.quantity?.type?.uomName
      },
      paymentTerm:this.model?.PaymentTerms?.paymentTerm
    }
    if(this.userData?.role === roles?.customer){
      this._quotationControllerService.addUserReplyUsingPUT(this.quotationDetails?.quotationId,body).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: QuotationVersionDto) => {
        this.router.navigate(['/profile/deals/quotations', this.dealId, this.productId])
      })
    }else{
      this._quotationControllerService.addSupplierReplyUsingPUT(this.quotationDetails?.quotationId,body).pipe(finalize(() => {
        this.isSubmit = false
      })).subscribe((res: QuotationVersionDto) => {
        this.router.navigate(['/profile/deals/quotations', this.dealId, this.productId])
      })
    }
  }
}
