import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { ChatDto, InboxControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.scss']
})
export class MessageCardComponent extends AppBaseComponent implements OnInit,OnDestroy {
  @Input()ChatDto:ChatDto;

  readStatus = false
  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,

  ) {
    super(injector)

  }

  ngOnInit(): void {
  }


  onOpen(){
    this._sharedService.sendInbox.next(this.ChatDto)
    if(this.ChatDto.status === 'NOT_READ'){
      const markChatAsReadUsingPUTSub =this.InboxControllerService.markChatAsReadUsingPUT(this.ChatDto.chatId).subscribe(res =>{
        this.readStatus = true
      })
      this.unSubscription.push(markChatAsReadUsingPUTSub)
    }
  }
}
