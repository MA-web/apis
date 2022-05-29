import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { finalize } from 'rxjs';
import { ChatDto, InboxControllerService, MessageDto, PageChatDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.scss']
})
export class ProfileInboxComponent extends AppBaseComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  options2: FormlyFormOptions = {};

  chatList: Array<ChatDto> = []

  ChatDto: ChatDto;
  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,
  ) {
    super(injector)
    this.isLoading = true
  }
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.getList()

    this.fields = [
      {
        className: 'SearchInbox',
        key: 'search',
        type: 'input',
        templateOptions: {
          placeholder: this._translateService.instant('SearchMail'),
          change: (f, e) => {
            this.getList()
          }
        }
      },
    ]

    this.fields2 = [
      {
        className: 'col-12',
        key: 'messageContent',
        type: 'textarea',
        templateOptions: {
          placeholder: this._translateService.instant('Type your reply Here …..'),
          rows: 5,
          required:true
        }
      },
      {
        className: 'col-12 mt-4',
        key: 'inboxImages',
        type: 'file-upload',
        templateOptions: {
          multiple: true,
          text: this._translateService.instant('UploadFiles')
        }
      },
    ]

    const sendInboxSub = this._sharedService.sendInbox.subscribe((res: ChatDto) => {
      this.ChatDto = res
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    })
    this.unSubscription.push(sendInboxSub)

    const RefreshInboxSub = this._sharedService.RefreshInbox.subscribe(res =>{
      this.refreshList()
    })
    this.unSubscription.push(RefreshInboxSub)
  }


  pageChanged(event: PageChangedEvent): void {
    this.pageNumber = event.page - 1;
    this.refreshList()
  }

  getList() {
    const getInboxUsingGETSub = this.InboxControllerService.getInboxUsingGET(this.pageNumber, this.model?.search, this.pageSize).subscribe((res: PageChatDto) => {
      this.chatList = res?.content;
      this.totalElements = res?.totalElements
      this.isLoading = false
      this.ChatDto = res?.content[0];
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    })
    this.unSubscription.push(getInboxUsingGETSub)
  }

  refreshList(){
    const getInboxUsingGETSub = this.InboxControllerService.getInboxUsingGET(this.pageNumber, this.model?.search, this.pageSize).subscribe((res: PageChatDto) => {
      this.chatList = res?.content;
      this.totalElements = res?.totalElements
      this.isLoading = false
    })
    this.unSubscription.push(getInboxUsingGETSub)
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onSubmit() {
    this.isSubmit = true;
    let MessageDto: MessageDto = {
      // attachment: {
      //   attachmentSource: {
      //     attachmentSourceId: 1,
      //     attachmentSourceName: 'x'
      //   },
      //   reference: 'x'
      // },
      messageContent: this.model2?.messageContent,
      sender: {
        id: this.userData?.role === roles?.customer ? this.userData?.id : this.userData?.supplierId,

      }
    }
   const replyToChatUsingPOSTSub = this.InboxControllerService.replyToChatUsingPOST(this.ChatDto?.chatId, MessageDto).pipe(
      finalize(() =>{
        this.isSubmit = false;
      })
    ).subscribe((res: MessageDto) => {
      if(res){
        this.options.resetModel()
        this.ChatDto.messages.push(res)
        this.scrollToBottom();
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    })
    this.unSubscription.push(replyToChatUsingPOSTSub)
  }
}
