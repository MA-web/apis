import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from '../../formly-conf/formly-conf.module';
import { DeleteAccountAlertComponent } from './delete-account-alert/delete-account-alert.component';
import { ProductActionAlertComponent } from './product-action-alert/product-action-alert.component';
import { EventActionAlertComponent } from './event-action-alert/event-action-alert.component';



@NgModule({
  declarations: [
    DeleteAccountAlertComponent,
    ProductActionAlertComponent,
    EventActionAlertComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormlyConfModule
  ]
})
export class AlertConfModule { }
