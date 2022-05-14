import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileInfoComponent } from './profile-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { InlineSVGModule } from 'ng-inline-svg-2';

const route: Route[] = [
  { path: '', component: ProfileInfoComponent },
]


@NgModule({
  declarations: [ProfileInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    FormlyConfModule,
    InlineSVGModule
  ]
})
export class ProfileInfoModule { }
