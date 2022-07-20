import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendInboxComponent } from './send-inbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from '../../formly-conf/formly-conf.module';



@NgModule({
  declarations: [SendInboxComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormlyConfModule

  ]
})
export class SendInboxModule { }
