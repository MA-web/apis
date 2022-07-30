import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInboxComponent } from './profile-inbox.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedProfileModule } from '../../profile/shared-profile/shared-profile.module';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const route: Route[] = [
  { path: '', component: ProfileInboxComponent },
]

@NgModule({
  declarations: [
    ProfileInboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedProfileModule,
    FormlyConfModule,
    PaginationModule,
    AccordionModule,
    LazyLoadImageModule,

  ]
})
export class ProfileInboxModule { }
