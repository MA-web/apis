import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-send-quotation',
  templateUrl: './send-quotation.component.html',
  styleUrls: ['./send-quotation.component.scss']
})
export class SendQuotationComponent extends AppBaseComponent implements OnInit {


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
                key: 'TermsAnfConditions',
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
                key: 'SpecialPrecaution',
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
                key: 'ShipmentIncludedDocuments',
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
                key: 'BeneficiaryName',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryName'),
                  required:true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'Phone',
                type: 'phone',
                templateOptions: {
                  label: this._translateService.instant('Phone'),
                  required:true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'BeneficiaryBankName',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryBankName'),
                  required:true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'BeneficiaryAccountNumber',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('BeneficiaryAccountNumber'),
                  required:true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'SWIFTCode',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('SWIFTCode'),
                  required:true
                },
              },
              {
                className: 'col-md-6 col-12',
                key: 'IBAN',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('IBAN'),
                  required:true
                },
              },
              {
                className: 'col-12',
                key: 'IntermediateBankAndData',
                type: 'input',
                templateOptions: {
                  label: this._translateService.instant('IntermediateBankAndData'),
                  required:true
                },
              },
            ],
          },


        ],
      }
    ]
  }
  onSubmit() {

    console.log(this.form);
  }
}
