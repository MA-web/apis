import { Component, Input, OnInit } from '@angular/core';
import { PublicItemDto } from 'src/app/@api';

@Component({
  selector: 'app-supplier-product',
  templateUrl: './supplier-product.component.html',
  styleUrls: ['./supplier-product.component.scss']
})
export class SupplierProductComponent implements OnInit {
  @Input() product: PublicItemDto;

  constructor() { }

  ngOnInit(): void {
  }

}
