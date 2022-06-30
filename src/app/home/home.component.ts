import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { take } from 'rxjs';
import { EventDto, ItemControllerService, NewsDto, PageEventDto, PageNewsDto, PagePartnerDto, PagePublicItemDto, PartnerDto, PublicDataControllerService, PublicItemDto } from '../@api';
import { AppBaseComponent } from '../shared/components/app-base/app-base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends AppBaseComponent implements OnInit, OnDestroy {

  products: Array<PublicItemDto> = [];
  latestNews: Array<NewsDto> = []
  latestEvents: Array<EventDto> = []
  PartnerList:Array<PartnerDto> = []
  isLoadingLatestProducts = false;
  isLoadingLatestNews = false;
  isLoadingLatestEvents = false;
  constructor(
    injector: Injector,
    private _publicDataControllerService: PublicDataControllerService,
    private ItemControllerService:ItemControllerService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.getLatestProducts()
    this.getNews()
    this.getEvents()
    this.getAllPartner()
  }



  getLatestProducts() {
    this.isLoadingLatestProducts = true;
    let observable;
    if (!this._sharedService.checkToken()) {
      observable = this._publicDataControllerService.getLatestPublishedProductsUsingGET1().pipe(take(1))
    }else{
      observable = this.ItemControllerService.getLatestPublishedProductsUsingGET().pipe(take(1))
    }
    const sub = observable.subscribe((res: PagePublicItemDto) => {
      if (res) {
        this.products = res.content;
        this.isLoadingLatestProducts = false;
      }
    })
    this.unSubscription.push(sub)
  }

  getNews() {
    this.isLoadingLatestNews = true;
    const getNewsUsingGETSub = this._publicDataControllerService.getNewsUsingGET(0,1).subscribe((res: PageNewsDto) => {
      if (res) {
        this.latestNews = res.content;
        this.isLoadingLatestNews = false;
      }
    })
    this.unSubscription.push(getNewsUsingGETSub)
  }
  onViewNews(){
    const navigationExtras: NavigationExtras = { state: { data: this.latestNews[0] } };
    this.router.navigate(['/news/details', this.latestNews[0]?.newsId], navigationExtras);
  }

  getEvents() {
    this.isLoadingLatestEvents = true;
    const getEventsUsingGET1Sub = this._publicDataControllerService.getEventsUsingGET1(undefined,undefined,0,3).subscribe((res: PageEventDto) => {
      if (res) {
        this.latestEvents = res.content;
        this.isLoadingLatestEvents = false;
      }
    })
    this.unSubscription.push(getEventsUsingGET1Sub)

  }

  onViewEvent(event:EventDto){
    const navigationExtras: NavigationExtras = { state: { data: event } };
    this.router.navigate(['/news/details', event?.eventId], navigationExtras);
  }

  getAllPartner(){
    const getEventsUsingGET1Sub = this._publicDataControllerService.getPublishedPartnersUsingGET(0,6).subscribe((res: PagePartnerDto) => {
      console.log('res: ', res);
      if (res) {
        this.PartnerList = res.content;
      }
    })
    this.unSubscription.push(getEventsUsingGET1Sub)
  }
}
