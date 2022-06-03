import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';

const route: Route[] = [
  { path: '', component: HomeComponent },
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    LayoutModule,
    SharedModule,
    TranslateModule
  ]
})
export class HomeModule { }
