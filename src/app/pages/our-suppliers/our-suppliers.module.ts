import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OurSuppliersListComponent } from './our-suppliers-list/our-suppliers-list.component';

const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: OurSuppliersListComponent },
  // { path: 'details', component: ProductDetailsComponent },

]

@NgModule({
  declarations: [OurSuppliersListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    FormlyConfModule,
    PaginationModule,
  ],
})
export class OurSuppliersModule {}
