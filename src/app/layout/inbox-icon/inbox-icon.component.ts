import { Component, Injector, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { SendInboxComponent } from 'src/app/shared/components/send-inbox/send-inbox.component';

@Component({
  selector: 'app-inbox-icon',
  templateUrl: './inbox-icon.component.html',
  styleUrls: ['./inbox-icon.component.scss']
})
export class InboxIconComponent extends AppBaseComponent implements OnInit {

  constructor(
    Injector: Injector,
    private modalService: BsModalService
  ) {
    super(Injector)
  }

  ngOnInit(): void {
  }

  onSend(){
    const initialState = {
      class: 'modal-md',
      initialState: {
        admin:true
      }
    };
    this.modalService.show(SendInboxComponent, initialState);
  }
}
