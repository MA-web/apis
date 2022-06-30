import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { QuotationControllerService, QuotationVersionDto, QuotationVersionRequestDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-send-quotation',
  templateUrl: './send-quotation.component.html',
  styleUrls: ['./send-quotation.component.scss']
})
export class SendQuotationComponent extends AppBaseComponent implements OnInit {

  productId: number;
  dealId: number;
  constructor(
    Injector: Injector,
    private _quotationControllerService: QuotationControllerService
  ) {
    super(Injector)
    this.route.params.subscribe(param => {

      this.dealId = +this.route.snapshot['_urlSegment'].segments[3]
      this.productId = +this.route.snapshot['_urlSegment'].segments[4]
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.fields = [
      {
        type: 'accordion',
        fieldGroup: [
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
                templateOptions: {
                  placeholder: this._translateService.instant('TermsAnfConditions'),
                  rows: 5
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
                templateOptions: {
                  placeholder: this._translateService.instant('SpecialPrecaution'),
                  rows: 5
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
                templateOptions: {
                  placeholder: this._translateService.instant('ShipmentIncludedDocuments'),
                  rows: 5
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
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryName'),
                  required: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'beneficiaryPhone',
                type: 'phone',
                templateOptions: {
                  label: this._translateService.instant('Phone'),
                  required: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'beneficiaryBankName',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryBankName'),
                  required: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'beneficiaryAccountNumber',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryAccountNumber'),
                  required: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'swiftCode',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('SWIFTCode'),
                  required: true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'iban',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('IBAN'),
                  required: true
                },
              },
              {
                className: 'col-12',
                key: 'intermediateBank',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('IntermediateBankAndData'),
                  required: true
                },
              },
            ],
          },


        ],
      }
    ]
  }
  onSubmit() {
    this.isSubmit = true;
    let body: QuotationVersionRequestDto = {
      bankAccount: {
        beneficiaryAccountNumber: this.model?.beneficiaryAccountNumber,
        beneficiaryBankName: this.model?.beneficiaryBankName,
        beneficiaryName: this.model?.beneficiaryName,
        beneficiaryPhone: this.model?.beneficiaryPhone['e164Number'],
        iban: this.model?.iban,
        intermediateBank: this.model?.intermediateBank,
        swiftCode: this.model?.swiftCode,
      },
      dealId: this.dealId,
      shipmentIncludedDocuments: this.model?.shipmentIncludedDocuments,
      specialPrecaution: this.model?.specialPrecaution,
      termsConditions: this.model?.termsConditions,
    }
    this._quotationControllerService.addQuotationUsingPOST(body).pipe(finalize(() => {
      this.isSubmit = false
    })).subscribe((res: QuotationVersionDto) => {
      if(res){
        this._sharedService.sendOPenQuotation.next(true)
        this.router.navigate(['/profile/deals/quotations', this.dealId, this.productId])
       setTimeout(() => {
        window.location.reload()
       }, 1000);
      }
    })
  }
}
