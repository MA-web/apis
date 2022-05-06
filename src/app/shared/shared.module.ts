import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppBaseComponent } from './components/app-base/app-base.component';



@NgModule({
  declarations: [
    ProductCardComponent,
    AppBaseComponent
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    ProductCardComponent,
  ]
})
export class SharedModule { }
