import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { breadcrumb } from '../../models/breadcrumb.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent  {
  breadcrumbItems: breadcrumb[] = []

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = []
  options: FormlyFormOptions = {};

  _translateService: TranslateService;
  _sharedService: SharedService;

  constructor(injector: Injector) {
    this._translateService = injector.get(TranslateService);
    this._sharedService = injector.get(SharedService);
  }



}
