import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { PublicItemDto } from 'src/app/@api';
import { AppBaseComponent } from '../app-base/app-base.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent extends AppBaseComponent implements OnInit {
  @Input() bgWhite:string = ''

@Input() product:PublicItemDto;



  ngOnInit(): void {
  }

  onView(product:PublicItemDto){
    const navigationExtras: NavigationExtras = { state: { data: this.product } };
    this.router.navigate(['/products/details',product?.itemId], navigationExtras);

  }
}
