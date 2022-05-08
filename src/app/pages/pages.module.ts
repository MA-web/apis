import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { AboutUsComponent } from './about-us/about-us.component';

const route: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'about-us',
    component:AboutUsComponent
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./our-suppliers/our-suppliers.module').then(m => m.OurSuppliersModule)
  },
]

@NgModule({
  declarations: [
    PagesComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule
  ]
})
export class PagesModule { }
