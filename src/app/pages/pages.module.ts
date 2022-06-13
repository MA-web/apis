import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { AppRouteGuard } from '../shared/guards/route-guard';

const route: Route[] = [
 {path:'', component:PagesComponent,children:[
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
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
  },
  {
    path: 'suppliers',
    loadChildren: () => import('./our-suppliers/our-suppliers.module').then(m => m.OurSuppliersModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AppRouteGuard]

  },
 ]}
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
