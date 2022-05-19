import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OurSuppliersListComponent } from './our-suppliers-list/our-suppliers-list.component';
import { SupplierDetailsComponent } from './supplier-details/supplier-details.component';
import { SwiperModule } from 'swiper/angular';

const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OurSuppliersListComponent },
  { path: 'details', component: SupplierDetailsComponent },

]

@NgModule({
  declarations: [OurSuppliersListComponent, SupplierDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    FormlyConfModule,
    PaginationModule,
    SwiperModule
  ],
})
export class OurSuppliersModule {}
