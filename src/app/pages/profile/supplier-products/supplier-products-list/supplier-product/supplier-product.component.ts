import { Component, Input, OnInit } from '@angular/core';
import { ItemDto} from 'src/app/@api';

@Component({
  selector: 'app-supplier-product',
  templateUrl: './supplier-product.component.html',
  styleUrls: ['./supplier-product.component.scss']
})
export class SupplierProductComponent implements OnInit {
  @Input() product: ItemDto;

  constructor() { }

  ngOnInit(): void {
  }

}
