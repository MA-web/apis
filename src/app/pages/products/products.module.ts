import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SwiperModule } from 'swiper/angular';
import { LightboxModule } from 'ngx-lightbox';
import { FileSaverModule } from 'ngx-filesaver';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';


const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductsListComponent },
  { path: 'details/:id', component: ProductDetailsComponent },

]


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    FormlyConfModule,
    PaginationModule,
    SwiperModule,
    LightboxModule,
    FileSaverModule,
    NgxSkeletonLoaderModule,
    NoDataModule,
    LazyLoadImageModule,

  ]
})
export class ProductsModule { }
