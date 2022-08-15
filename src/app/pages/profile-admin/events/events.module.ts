import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsDetailsComponent  } from './events-list/events-details/events-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EventComponent } from './events-list/event/event.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';
import { SharedProfileModule } from '../../profile/shared-profile/shared-profile.module';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoDataModule } from 'src/app/shared/no-data/no-data.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AddEventComponent } from './add-event/add-event.component';

const route: Route[] = [
  {
    path: '', component: EventsComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: EventsListComponent },
      { path: 'add', component: AddEventComponent },
      { path: 'details/:id', component: EventsDetailsComponent },  // maybe not used
      { path: 'edit/:id', component: AddEventComponent }
    ]
  },
]

@NgModule({
 declarations: [
  EventsComponent,
  EventsListComponent,
  AddEventComponent,
  EventsDetailsComponent,
  EventComponent,

 ],
 imports: [
   CommonModule,
   RouterModule.forChild(route),
   TranslateModule,
   FormlyConfModule,
   PaginationModule,
   SharedModule,
   LightboxModule,
   SharedProfileModule,
   InlineSVGModule,
   NgxSkeletonLoaderModule,
   NoDataModule,
   LazyLoadImageModule,

 ]
})
export class EventsModule { }
