import { AfterViewInit, ChangeDetectorRef, Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AttachmentSource, LookupControllerService } from 'src/app/@api';
import { breadcrumb } from '../../models/breadcrumb.model';
import { UploadFileService } from '../../services/file-upload.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-app-base',
  templateUrl: './app-base.component.html',
  styleUrls: ['./app-base.component.scss']
})
export class AppBaseComponent implements OnDestroy,AfterViewInit {

  pageNumber: number = 0;
  pageSize: number = 6
  totalElements: number = 0
  isLoading: boolean = false;
  isSubmit: boolean = false;
  isLoadingForm: boolean = false;
  breadcrumbItems: breadcrumb[] = []

  form = new FormGroup({});
  model: any = {};
  fields: FormlyFieldConfig[] = []
  options: FormlyFormOptions = {};

  searchResult: { category?: any, searchKey?: string } = { category: {} }

  userData: any = {}

  beforeImagesLoaded = []

  attachmentSource:Array<AttachmentSource> =[]
  unSubscription: Subscription[] = []

  _translateService: TranslateService;
  _sharedService: SharedService;
  router: Router;
  LookupControllerService: LookupControllerService
  toaster: ToastrService;
  route: ActivatedRoute;
  UploadFileService:UploadFileService
  cdr: ChangeDetectorRef
  constructor(injector: Injector) {
    this._translateService = injector.get(TranslateService);
    this._sharedService = injector.get(SharedService);
    this.router = injector.get(Router);
    this.LookupControllerService = injector.get(LookupControllerService);
    this.toaster = injector.get(ToastrService);
    this.route = injector.get(ActivatedRoute);
    this.UploadFileService = injector.get(UploadFileService);
    this.cdr = injector.get(ChangeDetectorRef);
    this.userData = this._sharedService?.getUser()
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  tabSelected(url: string) {
    this.router.navigateByUrl(url)
  }

  isFile(input) {
    if ('File' in window && input instanceof File)
       return true;
    else return false;
 }
 arrayHasKey(arr) {
  return arr.some(function (el) {
    if (el.file.fileToUpload) {
      return true;
    }

  });
}

getAttachmentsSource(){
  const getAttachmentsSourceUsingGETSub =  this.LookupControllerService.getAttachmentsSourceUsingGET().subscribe((res:Array<AttachmentSource>) =>{
    console.log('res: ', res);
    this.attachmentSource = res
  })
  this.unSubscription.push(getAttachmentsSourceUsingGETSub)
}

  ngOnDestroy(): void {
    this.unSubscription.forEach(sub => {
      sub.unsubscribe()
    })
  }
}
