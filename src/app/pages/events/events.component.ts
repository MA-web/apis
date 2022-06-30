import { Component, Injector, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { EventDto, PageEventDto, PublicDataControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { appRouts } from 'src/environments/environment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EventsComponent extends AppBaseComponent implements OnInit , OnDestroy{
  listArr: Array<EventDto> = []
  listArrAfterSlice:Array<EventDto> = []


  calendarOptions: CalendarOptions = {
    height:300,
    headerToolbar: {
      left: 'title',
      center: '',
      right: ''
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    weekends: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,

    // dateClick: this.openModal.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: true
    },
    aspectRatio:1,
  };

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
      { label: this._translateService.instant('events'), path: appRouts.events, active: true }
    ]
    this.getData()
  }
  getData() {
    const d = this._publicDataControllerService.getEventsUsingGET1(undefined,undefined,this.pageNumber,this.pageSize).subscribe((res: PageEventDto) => {
      if (res) {
        this.listArr = [... res.content];
        this.listArrAfterSlice = [...res.content.slice(2)]
        this.totalElements = res.totalElements
        this.calendarOptions.initialEvents = [...res.content].map((v ,i)=>({
          id: String(v?.eventId),
          title: '',
          start: new Date().setDate(new Date().getDate() + i),
          end: new Date().setDate(new Date().getDate() + i+1),
          className: 'bg-primary text-white'
        }))


        this.isLoading = false
      }
    })
  }

  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.getData()
  }

}
