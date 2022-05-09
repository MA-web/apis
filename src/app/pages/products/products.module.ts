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
import { CertificateComponent } from './product-details/certificate/certificate.component';
import { LightboxModule } from 'ngx-lightbox';
import { FileSaverModule } from 'ngx-filesaver';


const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductsListComponent },
  { path: 'details', component: ProductDetailsComponent },

]


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent,
    CertificateComponent
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
    FileSaverModule
  ]
})
export class ProductsModule { }
