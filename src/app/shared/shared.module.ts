import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { AppBaseComponent } from './components/app-base/app-base.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SupplierCardComponent } from './components/supplier-card/supplier-card.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonCardBoxComponent } from './components/skeleton-card-box/skeleton-card-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SendInboxModule } from './components/send-inbox/send-inbox.module';
import { TranslateModule } from '@ngx-translate/core';
import { AlertConfModule } from './components/alert-conf/alert-conf.module';



@NgModule({
  declarations: [
    ProductCardComponent,
    AppBaseComponent,
    BreadcrumbComponent,
    SupplierCardComponent,
    CertificateComponent,
    SkeletonCardBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxSkeletonLoaderModule,
    LazyLoadImageModule,
    InlineSVGModule,
    SendInboxModule,
    TranslateModule,
    AlertConfModule
  ],
  exports:[
    ProductCardComponent,
    BreadcrumbComponent,
    SupplierCardComponent,
    CertificateComponent,
    SkeletonCardBoxComponent
  ]
})
export class SharedModule { }
