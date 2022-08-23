import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { PartnersListComponent } from './partners-list/partners-list.component';
import { PartnersDetailsComponent  } from './partners-list/partners-details/partners-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PartnerComponent } from './partners-list/partner/partner.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SharedProfileModule } from '../../profile/shared-profile/shared-profile.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AddPartnerComponent } from './add-partner/add-partner.component';

const route: Route[] = [
  {
    path: '', component: PartnersComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PartnersListComponent },
      { path: 'add', component: AddPartnerComponent },
      { path: 'details/:id', component: PartnersDetailsComponent },  // maybe not used
      { path: 'edit/:id', component: AddPartnerComponent }
    ]
  },
]

@NgModule({
 declarations: [
  PartnersComponent,
  PartnersListComponent,
  AddPartnerComponent,
  PartnersDetailsComponent,
  PartnerComponent,

 ],
 imports: [
   CommonModule,
   RouterModule.forChild(route),
   TranslateModule,
   FormlyConfModule,
   PaginationModule,
   SharedModule,
   LightboxModule,
   SharedProfileModule,
   InlineSVGModule,
   NgxSkeletonLoaderModule,
   NoDataModule,
   LazyLoadImageModule,

 ]
})
export class PartnersModule { }
