import { Component, OnInit,} from "@angular/core";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import { AppBaseComponent } from "src/app/shared/components/app-base/app-base.component";


@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent extends AppBaseComponent implements OnInit {

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.breadcrumbItems = [
      { label: this._translateService.instant('MyProducts'), active: true },
    ]
    this.fields = [
      {
        className:'col-12',
        key: 'search',
        type: 'input',
        templateOptions: {
          placeholder: this._translateService.instant('Search on Table by ID, Product Name . . .')
        }
      },
    ]
    let myElement:any = document.querySelector("#fc-dom-1");
    myElement.textContent = myElement.textContent+ ' Events'


  }
  calendarEvents: EventInput[] = [
    {
        id: '2',
        title: '',
        start: new Date(),
        end: new Date(),
        className: 'bg-primary text-white'
    },
];

  calendarOptions: CalendarOptions = {
    height:300,
    headerToolbar: {
      left: 'title',
      center: '',
      right: ''
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: this.calendarEvents,
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
  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
