import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFavoriteProductsComponent } from './profile-favorite-products.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';

const route: Route[] = [
  { path: '', component: ProfileFavoriteProductsComponent },
]

@NgModule({
  declarations: [
    ProfileFavoriteProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    FormlyConfModule,
    PaginationModule,
    SharedModule
  ]
})
export class ProfileFavoriteProductsModule { }
