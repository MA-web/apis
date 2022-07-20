import { Component, Input, OnInit } from '@angular/core';
import { OurSuppliersSupplierDto } from 'src/app/@api';

@Component({
  selector: 'app-supplier-card',
  templateUrl: './supplier-card.component.html',
  styleUrls: ['./supplier-card.component.scss']
})
export class SupplierCardComponent implements OnInit {
  @Input() supplier:OurSuppliersSupplierDto;

  constructor() { }

  ngOnInit(): void {
  }

}
