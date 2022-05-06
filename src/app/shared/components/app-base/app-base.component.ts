import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent  {

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = []


  _translateService: TranslateService;

  constructor(injector: Injector) {
    this._translateService = injector.get(TranslateService);
  }



}
