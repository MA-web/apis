import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Route, RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/layout.module';
import { AboutAuComponent } from './about-au/about-au.component';

const route: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'about-us',
    component:AboutAuComponent
  }
]

@NgModule({
  declarations: [
    PagesComponent,
    AboutAuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule
  ]
})
export class PagesModule { }
