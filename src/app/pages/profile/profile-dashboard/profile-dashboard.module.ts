import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileDashboardComponent } from './profile-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { FullCalendarModule } from '@fullcalendar/angular';
import { DashboardDealComponent } from './dashboard-deal/dashboard-deal.component';
import { SharedProfileModule } from '../shared-profile/shared-profile.module';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);


const route: Route[] = [
  { path: '', component: ProfileDashboardComponent },
]

@NgModule({
 declarations: [
  ProfileDashboardComponent,
  RadialBarChartComponent,
  DashboardDealComponent,

 ],
 imports: [
   CommonModule,
   RouterModule.forChild(route),
   TranslateModule,
   NgApexchartsModule,
   FormlyConfModule,
   PaginationModule,
   FullCalendarModule,
   SharedProfileModule
 ]
})
export class ProfileDashboardModule { }
