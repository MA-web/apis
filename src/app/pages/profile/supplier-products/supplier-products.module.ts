import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SupplierProductsComponent } from './supplier-products.component';
import { SupplierProductsListComponent } from './supplier-products-list/supplier-products-list.component';
import { SupplierAddProductComponent } from './supplier-add-product/supplier-add-product.component';
import { SupplierProductsDetailsComponent } from './supplier-products-list/supplier-products-details/supplier-products-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SupplierProductComponent } from './supplier-products-list/supplier-product/supplier-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SharedProfileModule } from '../shared-profile/shared-profile.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const route: Route[] = [
  {
    path: '', component: SupplierProductsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SupplierProductsListComponent },
      { path: 'add', component: SupplierAddProductComponent },
      { path: 'details/:id', component: SupplierProductsDetailsComponent },
      { path: 'edit/:id', component: SupplierAddProductComponent }
    ]
  },
]

@NgModule({
 declarations: [
  SupplierProductsComponent,
  SupplierProductsListComponent,
  SupplierAddProductComponent,
  SupplierProductsDetailsComponent,
  SupplierProductComponent,

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
export class SupplierProductsModule { }
