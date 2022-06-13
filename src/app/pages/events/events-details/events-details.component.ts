import { Component, Injector, OnInit } from '@angular/core';
import { EventDto, PublicDataControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent extends AppBaseComponent implements OnInit {
  data:EventDto;
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
        this.data = state?.data;
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
      { label: this._translateService.instant('events'), path: appRouts.events, active: true },
      { label: this.data?.title, active: true }
    ]
  }

  getDetails() {
    this.isLoading = true;
    const getItemByItemIdUsingGETSub = this._publicDataControllerService.getEventByIdUsingGET(this.id).subscribe((res: EventDto) => {
      if (res) {
        this.data = res;
        this.breadcrumbItems = [
          { label: this._translateService.instant('events'), path: appRouts.events },
          { label: this.data?.title, active: true }
        ]
        this.isLoading = false;
      }
    })
    this.unSubscription.push(getItemByItemIdUsingGETSub)
  }
}
