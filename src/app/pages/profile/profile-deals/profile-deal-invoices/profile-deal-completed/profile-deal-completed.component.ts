import { Component, Injector, Input, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';
import { DealDto, InquiryVersionIdDto, InquiryVersionResponseDto, InvoiceDto, ItemDto, OrderDto, QuotationVersionDto } from 'src/app/@api';
import { BsModalService } from 'ngx-bootstrap/modal';
import { DealPreviewComponent } from '../deal-preview/deal-preview.component';
@Component({
    selector: 'app-profile-deal-completed',
    templateUrl: './profile-deal-completed.component.html',
    styleUrls: ['./profile-deal-completed.component.scss']
})
export class ProfileDealCompletedComponent extends AppBaseComponent implements OnInit {
    @Input() dealDetails: DealDto
    @Input() invoiceDetails: InvoiceDto;
    @Input() lastApproveInquiry: InquiryVersionResponseDto;
    @Input() lastApprovedQuotation: QuotationVersionDto
    @Input() lastApprovedOrder: OrderDto;
    @Input() productDetails: ItemDto
    constructor(
        Injector: Injector,
        private modalService: BsModalService
      ) {
        super(Injector)

      }

    ngOnInit(): void {
        this.route.params.subscribe(param => {
            this.dealId = +param['dealId']
        })
    }


    //   async generatePDF() {
    //     let docDefinition = {
    //         pageMargins: [0, 0, 0, 0],
    //         pagePadding: [0, 0, 0, 0],
    //         content: [
    //             {
    //                 style: 'header',
    //                 table: {
    //                     widths:'*',
    //                     body: [
    //                         [
    //                             {
    //                                 border: [false, false, false, false],
    //                                 fillColor: '#5bc0de',
    //                                 columns: [
    //                                     [

    //                                         {
    //                                             image: await this.getBase64ImageFromURL(
    //                                                 '../../../../../../assets/img/logo.png'
    //                                             ),
    //                                             width: '90',
    //                                         },
    //                                     ],
    //                                     [
    //                                         {
    //                                             text: `#Deal - ${this.dealDetails?.dealNumber}`,
    //                                             alignment: 'left',
    //                                             margin: [0, 0, 0, 0],
    //                                         },
    //                                         {
    //                                             text: `${this.productDetails?.itemName}`,
    //                                             alignment: 'left',
    //                                             margin: [0, 0, 0, 0],
    //                                             fontSize: 19,
    //                                         },
    //                                     ],
    //                                 ],
    //                             }
    //                         ]
    //                     ]
    //                 }
    //             },

    //             {
    //                 text: this._translateService.instant(
    //                      'Deal Details'
    //                 ),
    //                 fontSize: 19,
    //                 alignment: 'center',
    //                 color: '#000',
    //                 margin: [0, 0, 0, 0],

    //                 decoration: 'underline',
    //             },
    //             // {
    //             //     text: `${this._translateService.instant( 'number')} : ${this.checkData(this.details?.number)}`,
    //             //     margin: [0, 40, 0, 0],
    //             // },
    //             // {
    //             //     text: `${this._translateService.instant( 'createdDate')} :  ${this.checkData(this.formateDate(this.details?.createdDate))}`,
    //             //     margin: [0, 40, 0, 0],
    //             // },
    //             // {
    //             //     text: `${this._translateService.instant( 'balance')} : ${this.checkData(this.details.currency)} ${this.CurrencyPipe.transform(this.details?.balance,'','')}`,
    //             //     margin: [0, 20, 0, 0],
    //             // },
    //             // {
    //             //     text: `${this._translateService.instant( 'name')} :  ${this.checkData(this.details?.name)}`,
    //             //     margin: [0, 20, 0, 0],
    //             // },
    //             // {
    //             //     text: `${this._translateService.instant( 'Main_Source')} :  ${this.checkData(this.details?.mainAccount?.bank?.name)}`,
    //             //     margin: [0, 20, 0, 0],
    //             // },
    //             // {
    //             //     text: `${this._translateService.instant( 'Main_Account')} :  ${this.checkData(this.details?.mainAccount?.number)}`,
    //             //     margin: [0, 20, 0, 0],
    //             // },
    //         ],
    //     };

    //     pdfMake.createPdf(docDefinition).print();
    // }

    generatePDF() {
        const initialState:any = {
            class: 'modal-xl',
            initialState: {
                dealDetails: this.dealDetails,
                invoiceDetails: this.invoiceDetails,
                lastApproveInquiry: this.lastApproveInquiry,
                lastApprovedQuotation: this.lastApprovedQuotation,
                lastApprovedOrder: this.lastApprovedOrder,
                productDetails: this.productDetails,
            }
          };
          this.modalService.show(DealPreviewComponent, initialState);
    }
}
