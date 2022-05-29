import { Component, Input, OnInit } from '@angular/core';
import { ChatDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent extends AppBaseComponent implements OnInit {
  @Input()ChatDto:ChatDto;


  ngOnInit(): void {
  }


  onOpen(){
    this._sharedService.sendInbox.next(this.ChatDto)
  }
}
