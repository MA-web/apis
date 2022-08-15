import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs.component';
import { FaqsListComponent } from './faqs-list/faqs-list.component';
import { FaqsDetailsComponent  } from './faqs-list/faqs-details/faqs-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FaqComponent } from './faqs-list/faq/faq.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SharedProfileModule } from '../../profile/shared-profile/shared-profile.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AddFaqComponent } from './add-faq/add-faq.component';

const route: Route[] = [
  {
    path: '', component: FaqsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: FaqsListComponent },
      { path: 'add', component: AddFaqComponent },
      { path: 'details/:id', component: FaqsDetailsComponent },  // maybe not used
      { path: 'edit/:id', component: AddFaqComponent }
    ]
  },
]

@NgModule({
 declarations: [
  FaqsComponent,
  FaqsListComponent,
  AddFaqComponent,
  FaqsDetailsComponent,
  FaqComponent,

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
export class FaqsModule { }
