import { Component, Injector, OnInit } from '@angular/core';
import { AppBaseComponent } from '../shared/components/app-base/app-base.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent extends AppBaseComponent implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector)
  }

  ngOnInit(): void {
  }

}
