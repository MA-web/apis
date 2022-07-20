import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { Route, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFullCardComponent } from './event-full-card/event-full-card.component';

import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import bootstrapPlugin from "@fullcalendar/bootstrap";
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventsDetailsComponent } from './events-details/events-details.component';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin
]);



const route: Route[] = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EventsComponent },
  { path: 'details/:id', component: EventsDetailsComponent },

]

@NgModule({
  declarations: [
    EventsComponent,
    EventCardComponent,
    EventFullCardComponent,
    EventsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    SharedModule,
    PaginationModule,
    NgxSkeletonLoaderModule,
    NoDataModule,
    LazyLoadImageModule,
    FullCalendarModule
  ]
})
export class EventsModule { }
