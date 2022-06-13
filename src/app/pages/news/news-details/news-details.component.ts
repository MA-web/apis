import { Component, Injector, OnInit } from '@angular/core';
import { NewsDto, PublicDataControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent extends AppBaseComponent implements OnInit {
  news:NewsDto;
  id: any;
  constructor(
    injector: Injector,
    private _publicDataControllerService: PublicDataControllerService
  ) {
    super(injector)
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation?.extras?.state as { data: any };
      if (state) {
        this.news = state?.data;
        this.isLoading = false;
      } else {
        this.route.params.subscribe(param => {
          this.id = param['id']
          this.getDetails()
        })

      }


    }
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('news'), path: appRouts.news, active: true },
      { label: this.news?.title, active: true }
    ]
  }

  getDetails() {
    this.isLoading = true;
    const getItemByItemIdUsingGETSub = this._publicDataControllerService.getNewsByIdUsingGET(this.id).subscribe((res: NewsDto) => {
      if (res) {
        this.news = res;
        this.breadcrumbItems = [
          { label: this._translateService.instant('Products'), path: appRouts.productsList },
          { label: this.news?.title, active: true }
        ]
        this.isLoading = false;
      }
    })
    this.unSubscription.push(getItemByItemIdUsingGETSub)
  }
}
