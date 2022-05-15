import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedProfileModule } from '../shared-profile/shared-profile.module';
import { ProfileDealsComponent } from './profile-deals.component';
import { ProfileDealsListComponent } from './profile-deals-list/profile-deals-list.component';
import { ProfileDealCardComponent } from './profile-deal-card/profile-deal-card.component';
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

const route: Route[] = [
  {
    path: '', component: ProfileDealsComponent, children: [
      { path: '', redirectTo: 'inquiry', pathMatch: 'full' },
      { path: ':type', component: ProfileDealsListComponent },
      { path: ':type/:id', component: ProfileDealDetailsComponent },
      { path: ':type/:id/filling', component: InquiryFillingComponent },
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
  ProfileDealsQuotationsComponent
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
