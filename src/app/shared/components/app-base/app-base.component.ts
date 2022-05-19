import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LookupControllerService } from 'src/app/@api';
import { breadcrumb } from '../../models/breadcrumb.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent implements OnDestroy {
  isLoading:boolean = false;
  isSubmit:boolean = false;

  breadcrumbItems: breadcrumb[] = []

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = []
  options: FormlyFormOptions = {};

  unSubscription:Subscription[] = []

  _translateService: TranslateService;
  _sharedService: SharedService;
  router:Router;
  LookupControllerService:LookupControllerService
  constructor(injector: Injector) {
    this._translateService = injector.get(TranslateService);
    this._sharedService = injector.get(SharedService);
    this.router = injector.get(Router);
    this.LookupControllerService = injector.get(LookupControllerService);
  }


  tabSelected(url:string){
      this.router.navigateByUrl(url)
  }

  ngOnDestroy(): void {
    this.unSubscription.forEach(sub => sub.unsubscribe())
  }
}
