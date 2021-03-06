import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';


const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ProductsListComponent },
  { path: 'details', component: ProductDetailsComponent },

]


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    FormlyConfModule,
    PaginationModule
  ]
})
export class ProductsModule { }
