import { Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Lightbox } from 'ngx-lightbox';
import { finalize } from 'rxjs';
import {  ChatDto, InboxControllerService, MessageAttachmentDto, MessageDto, PageChatDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { roles } from 'src/environments/environment';

@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.scss']
})
export class ProfileInboxComponent extends AppBaseComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;


  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  options2: FormlyFormOptions = {};

  chatList: Array<ChatDto> = []

  ChatDto: ChatDto;

  selectMessagesAttach = []
  selectedMessageContent;

  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,
    private lightbox: Lightbox,
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
          required: true
        }
      },
      {
        className: 'col-12 mt-4',
        key: 'inboxImages',
        type: 'file-upload',
        templateOptions: {
          text: this._translateService.instant('UploadFiles'),
          multiple: true
        }
      },
    ]

    this.getAttachmentsSource();

    const sendInboxSub = this._sharedService.sendInbox.subscribe((res: ChatDto) => {
      this.ChatDto = res
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    })
    this.unSubscription.push(sendInboxSub)

    const RefreshInboxSub = this._sharedService.RefreshInbox.subscribe(res => {
      this.refreshList()
    })
    this.unSubscription.push(RefreshInboxSub)

    const resDataSub = this.UploadFileService.resData.subscribe(res => {
      var Values = [];
      //get olds values
      if (window.localStorage.getItem('addIInboxStorage')) {
        Values = JSON.parse(window.localStorage.getItem('addIInboxStorage'));
      }

      //push new value
      Values.push(res);

      window.localStorage.setItem('addIInboxStorage', JSON.stringify(Values))

      if (JSON.parse(window.localStorage.getItem('addIInboxStorage'))?.length === this.beforeImagesLoaded?.length) {
        let finalUploaded = JSON.parse(window.localStorage.getItem('addIInboxStorage'))

        finalUploaded= finalUploaded?.map((v, index) => ({
          attachment: {
            attachmentSource: {
              attachmentSourceId: this.attachmentSource[2]?.attachmentSourceId,
              attachmentSourceName: this.attachmentSource[2]?.attachmentSourceName
            },
            reference: v
          },
          attachmentName: v
        }))
        this.replyChat(finalUploaded)
      }


    })

   const sendEmptyAttachSub = this.UploadFileService.sendEmptyAttach.subscribe(res => {
      if (res) {
        this.replyChat(this?.selectMessagesAttach, this.selectedMessageContent)
      }
    })
    this.unSubscription.push(sendEmptyAttachSub)
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

  refreshList() {
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


  replyChat(attachments? , messageContent?) {
    let MessageDto: MessageDto = {
      attachments: attachments,
      messageContent: this.model2?.messageContent || messageContent,
      sender: {
        id: this.userData?.role === roles?.customer ? this.userData?.id : this.userData?.supplierId,
      }
    }
    const replyToChatUsingPOSTSub = this.InboxControllerService.replyToChatUsingPOST(this.ChatDto?.chatId, MessageDto).pipe(
      finalize(() => {
        this.isSubmit = false;
      })
    ).subscribe((res: MessageDto) => {
      if (res) {
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

  onDelete(item: MessageAttachmentDto, attachments: Array<MessageAttachmentDto>, index , messageContent) {
    attachments.splice(index, 1)
    this.UploadFileService.deleteFile(item?.attachment.reference)
    this.selectMessagesAttach = attachments?.map(v =>({
      attachment: {
        attachmentSource: {
          attachmentSourceId: this.attachmentSource[2]?.attachmentSourceId,
          attachmentSourceName: this.attachmentSource[2]?.attachmentSourceName
        },
        reference: v.attachment?.reference
      },
      attachmentName: v?.attachmentName
    }))

    this.selectedMessageContent= messageContent
  }

  onOpen(img){
    console.log('img: ', img);
    let imgs:any = []
   if(img){
     imgs.push( {'src':img,'caption':''})

    this.lightbox.open(imgs, 0,{
      showZoom: true,
      enableTransition: true,
      showDownloadButton: true,
    });
   }
  }

  onSubmit() {
    this.isSubmit = true;
    window.localStorage.removeItem('addIInboxStorage')
    this.beforeImagesLoaded = []


    if (this.model2?.inboxImages?.length) {
      let inboxImages = []
      for (let i = 0; i < this.model2?.inboxImages.length; i++) {
        let file = this.model2?.inboxImages[i];
        this.beforeImagesLoaded.push(file)
        inboxImages.push(file)
      }


      this.UploadFileService.uploadMultiple(inboxImages, `inboxes/inbox${this.ChatDto?.chatId}-${parseInt(String(Date.now() * Math.random()))}`)
    }

    if (!this.model2?.inboxImages) {
      this.replyChat()
    }

  }
}
