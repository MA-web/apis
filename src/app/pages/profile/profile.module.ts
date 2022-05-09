import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { NgxDropzoneModule } from 'ngx-dropzone';

const route: Route[] = [
  {path:'', component:ProfileComponent,children:[
    {path:'info', component:ProfileInfoComponent}
  ]}
 ]
@NgModule({
  declarations: [
    ProfileComponent,
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    AccordionModule,
    InlineSVGModule,
    FormlyConfModule,
    NgxDropzoneModule
  ]
})
export class ProfileModule { }
