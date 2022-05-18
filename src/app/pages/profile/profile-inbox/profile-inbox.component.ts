import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-inbox',
  templateUrl: './profile-inbox.component.html',
  styleUrls: ['./profile-inbox.component.scss']
})
export class ProfileInboxComponent extends AppBaseComponent implements OnInit {
  form2 = new FormGroup({});
  model2: any = {};
  fields2: FormlyFieldConfig[] = []
  options2: FormlyFormOptions = {};

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();


    this.fields = [
      {
        className:'SearchInbox',
        key: 'search',
        type: 'input',
        templateOptions: {
          placeholder: this._translateService.instant('SearchMail')
        }
      },
    ]

    this.fields2 = [
      {
        className: 'col-12',
        key: 'inboxImages',
        type: 'upload',
        templateOptions: {
          multiple:true,
        }
      },
    ]
  }



  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
