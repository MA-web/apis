import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseComponent } from './components/app-base/app-base.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SupplierCardComponent } from './components/supplier-card/supplier-card.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    AppBaseComponent,
    BreadcrumbComponent,
    SupplierCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProductCardComponent,
    BreadcrumbComponent,
    SupplierCardComponent
  ]
})
export class SharedModule { }
