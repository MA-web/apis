import { Component, Input, OnInit } from '@angular/core';
import { breadcrumb } from '../../models/breadcrumb.model';



@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input() items:breadcrumb[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
