import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { EventDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-event-full-card',
  templateUrl: './event-full-card.component.html',
  styleUrls: ['./event-full-card.component.scss']
})
export class EventFullCardComponent extends AppBaseComponent implements OnInit {
  @Input() event:EventDto;

  ngOnInit(): void {
  }
  onView(){
    const navigationExtras: NavigationExtras = { state: { data: this.event } };
    this.router.navigate(['/events/details', this.event?.eventId], navigationExtras);
  }
}
