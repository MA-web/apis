import { Component, Injector, OnDestroy, OnInit,} from "@angular/core";
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import { ChatDto, InboxControllerService, PageChatDto, SupplierControllerService, UserControllerService } from "src/app/@api";
import { AppBaseComponent } from "src/app/shared/components/app-base/app-base.component";
import { roles } from "src/environments/environment";


@Component({
  selector: 'app-profile-dashboard',
  templateUrl: './profile-dashboard.component.html',
  styleUrls: ['./profile-dashboard.component.scss']
})
export class ProfileDashboardComponent extends AppBaseComponent implements OnInit, OnDestroy {
  chatList: Array<ChatDto> = []
  messageCount: number = 0;

  profilePercent:number = 0;
  profilePercentLoading = false
  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,
    private UserControllerService:UserControllerService,
    private SupplierControllerService:SupplierControllerService

  ) {
    super(injector)
    this.isLoading = true
  }
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
    let myElement:any = document.querySelector(".fc-toolbar-title");
    myElement.textContent = myElement.textContent+ ' Events'

    this.getList();
    this.getProfilePercentage()
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

  getList() {
    const getInboxUsingGETSub = this.InboxControllerService.getInboxUsingGET(this.pageNumber, this.model?.search, 3).subscribe((res: PageChatDto) => {
      this.chatList = res?.content.filter(v =>{return v.status ===  ChatDto.StatusEnum.NOTREAD} );
      this.isLoading = false

    })
    this.unSubscription.push(getInboxUsingGETSub)
  }

  getMessageCount(){
    if(window.localStorage.getItem('messageCount')){
      this.messageCount = JSON.parse(window.localStorage.getItem('messageCount'))
    }
  }

  getProfilePercentage(){
    this.profilePercentLoading = true;
    let obs
    if(this.userData?.role === roles?.customer){
      obs =  this.UserControllerService.getProfilePercentageUsingGET1()
    }else{
      obs =  this.SupplierControllerService.getProfilePercentageUsingGET()
    }
   const getProfilePercentageUsingSub = obs.subscribe(res =>{
      if(res) this.profilePercent= res.profilePercent;    this.profilePercentLoading = false;
    })
    this.unSubscription.push(getProfilePercentageUsingSub)
  }

  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
