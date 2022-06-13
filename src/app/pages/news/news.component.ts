import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { NewsDto, PageNewsDto, PublicDataControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsComponent extends AppBaseComponent implements OnInit, OnDestroy {
  listArr: Array<NewsDto> = []
  listArrAfterSlice:Array<NewsDto> = []
  constructor(
    injector: Injector,
    private _publicDataControllerService: PublicDataControllerService
  ) {
    super(injector)
    this.isLoading = true
  }
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('news'), path: appRouts.news, active: true }
    ]
    this.getNews()
  }
  getNews() {
    const d = this._publicDataControllerService.getNewsUsingGET(this.pageNumber,this.pageSize).subscribe((res: PageNewsDto) => {
      if (res) {
        this.listArr = [... res.content];
        this.listArrAfterSlice = [...res.content.slice(2)]
        this.totalElements = res.totalElements
        this.isLoading = false
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getNews()
  }
}
