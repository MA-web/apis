import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ProfileAdminComponent } from './profile-admin.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { LightboxModule } from 'ngx-lightbox';


const route: Route[] = [
  {
    path: '', component: ProfileAdminComponent, children: [
      { path: '', redirectTo: 'inbox', pathMatch: 'full' },
      {
        path: 'inbox', loadChildren: () => import('./profile-inbox/profile-inbox.module').then(m => m.ProfileInboxModule)
      },
      {
        path: 'pages/events', loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'pages/news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'faq', loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule)
      },
      {
        path: 'partners', loadChildren: () => import('./partner/partners.module').then(m => m.PartnersModule)
      },

    
    ]
  }
]
@NgModule({
  declarations: [
    ProfileAdminComponent,


  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    AccordionModule,
    InlineSVGModule,
  ]
})
export class ProfileAdminModule { }
