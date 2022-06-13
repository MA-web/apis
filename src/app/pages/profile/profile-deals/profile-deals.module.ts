import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedProfileModule } from '../shared-profile/shared-profile.module';
import { ProfileDealsComponent } from './profile-deals.component';
import { ProfileDealsListComponent } from './shared-deal/profile-deals-list/profile-deals-list.component';
import { ProfileDealCardComponent } from './shared-deal/profile-deal-card/profile-deal-card.component';
import { ProfileDealDetailsComponent } from './profile-deal-details/profile-deal-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProfileDealInquiryComponent } from './profile-deal-inquiries/profile-deal-inquiry/profile-deal-inquiry.component';
import { ProfileDealInquiriesComponent } from './profile-deal-inquiries/profile-deal-inquiries.component';
import { InquiryFillingComponent } from './profile-deal-inquiries/inquiry-filling/inquiry-filling.component';
import { ProfileDealsQuotationsComponent } from './profile-deals-quotations/profile-deals-quotations.component';
import { SendQuotationComponent } from './profile-deals-quotations/send-quotation/send-quotation.component';
import { DealWaitingReplyComponent } from './shared-deal/deal-waiting-reply/deal-waiting-reply.component';
import { ProfileDealQuotationComponent } from './profile-deals-quotations/profile-deal-quotation/profile-deal-quotation.component';
import { ProfileDealOrdersComponent } from './profile-deal-orders/profile-deal-orders.component';
import { ProfileDealOrderComponent } from './profile-deal-orders/profile-deal-order/profile-deal-order.component';
import { ProfileDealInvoicesComponent } from './profile-deal-invoices/profile-deal-invoices.component';
import { ProfileDealInvoiceComponent } from './profile-deal-invoices/profile-deal-invoice/profile-deal-invoice.component';
import { ProfileDealsViewQuotationComponent } from './profile-deals-quotations/profile-deals-view-quotation/profile-deals-view-quotation.component';
import { ProfileDealCompletedComponent } from './profile-deal-invoices/profile-deal-completed/profile-deal-completed.component';
import { OrderFillingComponent } from './profile-deal-orders/order-filling/order-filling.component';

const route: Route[] = [
  {
    path: '', component: ProfileDealsComponent, children: [
      { path: '', redirectTo: 'inquiry', pathMatch: 'full' },
      { path: ':type', component: ProfileDealsListComponent },

      {
        path: 'inquiries/:id', component: ProfileDealDetailsComponent, children: [
          { path: '', component: ProfileDealInquiriesComponent },

        ]
      },

      { path: 'inquiries/filling/:id', component: InquiryFillingComponent },
      {
        path: 'quotations/:id', component: ProfileDealDetailsComponent, children: [
          {
            path: '', component: ProfileDealsQuotationsComponent, children: [
              { path: '', component: ProfileDealsViewQuotationComponent },
              { path: 'send-quotation', component: SendQuotationComponent },

            ]
          },

        ]
      },
      {
        path: 'orders/:id', component: ProfileDealDetailsComponent, children: [
          {
            path: '', component: ProfileDealOrdersComponent, children: [
              { path: 'filling', component: OrderFillingComponent },

            ]
          },

        ]
      },
      {
        path: 'invoices/:id', component: ProfileDealDetailsComponent, children: [
          {
            path: '', component: ProfileDealInvoicesComponent, children: [
              // { path: 'send-quotation', component: SendQuotationComponent },

            ]
          },

        ]
      },
    ]
  },
]

@NgModule({
  declarations: [
    ProfileDealsComponent,
    ProfileDealsListComponent,
    ProfileDealCardComponent,
    ProfileDealDetailsComponent,
    ProfileDealInquiryComponent,
    ProfileDealInquiriesComponent,
    InquiryFillingComponent,
    ProfileDealsQuotationsComponent,
    SendQuotationComponent,
    DealWaitingReplyComponent,
    ProfileDealQuotationComponent,
    ProfileDealOrdersComponent,
    ProfileDealOrderComponent,
    ProfileDealInvoicesComponent,
    ProfileDealInvoiceComponent,
    ProfileDealsViewQuotationComponent,
    ProfileDealCompletedComponent,
    OrderFillingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedProfileModule,
    TranslateModule,
    InlineSVGModule,
    SharedModule,
    PaginationModule,
    FormlyConfModule,
    TabsModule,
    AccordionModule
  ]
})
export class ProfileDealsModule { }
