import { Component, Injector, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DealDto, OrderControllerService, OrderDto, OrderRequestDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-order-filling',
  templateUrl: './order-filling.component.html',
  styleUrls: ['./order-filling.component.scss']
})
export class OrderFillingComponent extends AppBaseComponent implements OnInit {
  @Input() dealDetails: DealDto
  productId:number;
  constructor(
    injector: Injector,
    private _orderControllerService: OrderControllerService
  ) {
    super(injector);
    this.route.params.subscribe(param =>{
      this.productId = +param['productId']
    })
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.fields = [
      {
        type: 'accordion',
        fieldGroup: [
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
    let body :OrderRequestDto = {
      bankAccount: {
        beneficiaryAccountNumber: this.model?.beneficiaryAccountNumber,
        beneficiaryBankName: this.model?.beneficiaryBankName,
        beneficiaryName: this.model?.beneficiaryName,
        beneficiaryPhone: this.model?.beneficiaryPhone['e164Number'],
        iban: this.model?.iban,
        intermediateBank: this.model?.intermediateBank,
        swiftCode: this.model?.swiftCode,
      },
      dealId:this.dealDetails?.dealId
    }
    this._orderControllerService.addOrderUsingPOST(body).pipe(finalize(() => {
      this.isSubmit = false
    })).subscribe((res: OrderDto) => {
      
      window.location.reload()
    })
  }

  canFillOrder(){
    if(  this.dealDetails?.status === DealDto.StatusEnum.QUOTATIONDONE){
      return true
    }
    return false
  }
  
}
