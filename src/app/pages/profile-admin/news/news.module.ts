import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsListComponent } from './news-list/news-list.component';
import { AddNewComponent } from './add-new/add-new.component';
import { NewsDetailsComponent  } from './news-list/news-details/news-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NewComponent } from './news-list/new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SharedProfileModule } from '../../profile/shared-profile/shared-profile.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const route: Route[] = [
  {
    path: '', component: NewsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: NewsListComponent },
      { path: 'add', component: AddNewComponent },
      { path: 'details/:id', component: NewsDetailsComponent },  // maybe not used
      { path: 'edit/:id', component: AddNewComponent }
    ]
  },
]

@NgModule({
 declarations: [
  NewsComponent,
  NewsListComponent,
  NewsDetailsComponent,
  NewComponent,
  AddNewComponent
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
export class NewsModule { }
