import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const route: Route[] = [
  { path: '', component: ContactUsComponent },

]

@NgModule({
  declarations: [
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    SharedModule,
    TranslateModule,
    FormlyConfModule,
    NgxSkeletonLoaderModule
  ]
})
export class ContactUsModule { }
