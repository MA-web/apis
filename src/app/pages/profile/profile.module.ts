import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { SupplierProductsComponent } from './supplier-products/supplier-products.component';
import { SupplierProductComponent } from './supplier-products/supplier-products-list/supplier-product/supplier-product.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProfileDashboardComponent } from './profile-dashboard/profile-dashboard.component';
import { SupplierAddProductComponent } from './supplier-products/supplier-add-product/supplier-add-product.component';
import { SupplierProductsListComponent } from './supplier-products/supplier-products-list/supplier-products-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const route: Route[] = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ProfileDashboardComponent },
      { path: 'info', component: ProfileInfoComponent },
      { path: 'products', component: SupplierProductsComponent,children:[
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        { path: 'list', component: SupplierProductsListComponent },
        { path: 'add', component: SupplierAddProductComponent },
      ] },

      // {path:':id', component:SupplierProductsComponent}
    ]
  }
]
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent,
    SupplierProductsComponent,
    SupplierProductComponent,
    ProfileDashboardComponent,
    SupplierAddProductComponent,
    SupplierProductsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    AccordionModule,
    InlineSVGModule,
    FormlyConfModule,
    PaginationModule,
    SharedModule
  ]
})
export class ProfileModule { }
