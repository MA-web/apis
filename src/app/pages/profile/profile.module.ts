import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';


const route: Route[] = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard', loadChildren: () => import('./profile-dashboard/profile-dashboard.module').then(m => m.ProfileDashboardModule)
      },

      {
        path: 'info', loadChildren: () => import('./profile-info/profile-info.module').then(m => m.ProfileInfoModule)
      },

      {
        path: 'products', loadChildren: () => import('./supplier-products/supplier-products.module').then(m => m.SupplierProductsModule)
      },
      {
        path: 'deals',loadChildren: () => import('./profile-deals/profile-deals.module').then(m => m.ProfileDealsModule)
      },
      {
        path: 'inbox',loadChildren: () => import('./profile-inbox/profile-inbox.module').then(m => m.ProfileInboxModule)
      },

    ]
  }
]
@NgModule({
  declarations: [
    ProfileComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    AccordionModule,
    InlineSVGModule,
  ]
})
export class ProfileModule { }
