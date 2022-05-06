import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { NavComponent } from './nav/nav.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    FooterComponent,
    LeftMenuComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule

  ],
  exports:[
    FooterComponent,
    LeftMenuComponent,
    NavComponent
  ]
})
export class LayoutModule { }
