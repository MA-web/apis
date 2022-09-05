import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { ChatDto, InboxControllerService } from 'src/app/@api';
import { roles } from 'src/environments/environment';
import { AppBaseComponent } from '../app-base/app-base.component';

@Component({
  selector: 'app-send-inbox',
  templateUrl: './send-inbox.component.html',
  styleUrls: ['./send-inbox.component.scss']
})
export class SendInboxComponent extends AppBaseComponent implements OnInit, OnDestroy {

  supplierId:number;
  admin:boolean = false;

  constructor(
    injector: Injector,
    private InboxControllerService: InboxControllerService,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.isLoadingForm = true
  }
  async ngOnInit(){

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'chatTitle',
        type: 'input',
        templateOptions: {
          placeholder:this._translateService.instant('Subject'),
        }
      },
      {
        className:"noFormGroup",
        key: 'messageContent',
        type: 'textarea',
        templateOptions: {
          placeholder:this._translateService.instant('Write_message'),
          rows:7
        }
      },
    ]
  }

  onSubmit() {
    this.isSubmit = true;
    let chat :ChatDto ={
      chatTitle:this.model?.chatTitle,
      messages: [
      {
        messageContent: this.model?.messageContent,
      }
      ],
      user:{
        id:this.userData?.role === roles.customer?this.userData?.id :this.userData?.supplierId,
      },
      supplier:{
        id:+this.supplierId? +this.supplierId : +this.userData?.supplierId ? +this.userData?.supplierId : undefined
      }
    }
 

    if(this.admin){
      chat.adminChat = true;
      delete chat.user;
      delete chat.supplier;
    }

   const createChatUsingPOSTSub = this.InboxControllerService.createChatUsingPOST(chat).pipe(
      finalize(() =>{
        this.isSubmit = false;
      })
    ).subscribe((res:ChatDto) =>{
      this.toaster.success('Your message was sent successfully. The supplier will revert back to you shortly. Please check your Inbox')
      if(res) this.bsModalRef.hide()
    })
    this.unSubscription.push(createChatUsingPOSTSub)
  }

}
