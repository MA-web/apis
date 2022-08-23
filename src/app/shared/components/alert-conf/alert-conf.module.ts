import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from '../../formly-conf/formly-conf.module';
import { DeleteAccountAlertComponent } from './delete-account-alert/delete-account-alert.component';
import { ProductActionAlertComponent } from './product-action-alert/product-action-alert.component';
import { EventActionAlertComponent } from './event-action-alert/event-action-alert.component';
import { NewActionAlertComponent } from './new-action-alert/new-action-alert.component';
import { FaqActionAlertComponent } from './faq-action-alert/faq-action-alert.component';
import { PartnerActionAlertComponent } from './partner-action-alert/partner-action-alert.component';



@NgModule({
  declarations: [
    DeleteAccountAlertComponent,
    ProductActionAlertComponent,
    EventActionAlertComponent,
    NewActionAlertComponent,
    FaqActionAlertComponent,
    PartnerActionAlertComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormlyConfModule
  ]
})
export class AlertConfModule { }
