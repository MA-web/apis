import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { NavComponent } from './nav/nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {  ReactiveFormsModule } from '@angular/forms';
import { FormlyConfModule } from '../shared/formly-conf/formly-conf.module';
import { InboxIconComponent } from './inbox-icon/inbox-icon.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    FooterComponent,
    LeftMenuComponent,
    NavComponent,
    InboxIconComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    InlineSVGModule,
    BsDropdownModule,
    ReactiveFormsModule,
    FormlyConfModule,
    InlineSVGModule,
    ModalModule.forRoot(),
  ],
  exports:[
    FooterComponent,
    LeftMenuComponent,
    NavComponent,
    InboxIconComponent

  ]
})
export class LayoutModule { }
