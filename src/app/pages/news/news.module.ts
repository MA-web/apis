import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewFullCardComponent } from './new-full-card/new-full-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { TranslateModule } from '@ngx-translate/core';

const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: NewsComponent },
  { path: 'details/:id', component: NewsDetailsComponent },

]


@NgModule({
  declarations: [
    NewsComponent,
    NewsCardComponent,
    NewFullCardComponent,
    NewsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    PaginationModule,
    NgxSkeletonLoaderModule,
    NoDataModule,
    LazyLoadImageModule,
  ]
})
export class NewsModule { }
