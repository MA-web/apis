import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileFaqComponent } from './profile-faq.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const route: Route[] = [
  { path: '', component: ProfileFaqComponent },
]


@NgModule({
  declarations: [ProfileFaqComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    FormlyConfModule,
    InlineSVGModule,
    LazyLoadImageModule,
    ModalModule.forRoot(),
  ]
})
export class ProfileFaqModule { }
