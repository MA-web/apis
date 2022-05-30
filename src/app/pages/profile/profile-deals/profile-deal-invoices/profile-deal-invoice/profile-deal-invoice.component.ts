import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-invoice',
  templateUrl: './profile-deal-invoice.component.html',
  styleUrls: ['./profile-deal-invoice.component.scss']
})
export class ProfileDealInvoiceComponent extends AppBaseComponent implements OnInit, OnDestroy {


  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.fields = [
      {
        type: 'accordion',
        fieldGroup: [
          /*****************************Comments************************************* */
          {
            templateOptions: {
              label: this._translateService.instant('Comments'),
              required: true,
              open: true
            },
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                className: 'col-12',
                key: 'Comments',
                type: 'textarea',
                templateOptions: {
                  placeholder: this._translateService.instant('Comments'),
                  rows: 5
                },

              },
              {
                className: 'col-12',
                key: 'Commentsread',
                type: 'text',
                templateOptions: {
                  text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book Ipsum has been the industry’s standard dummy text ever since the 1500s,when an Ipsum has been the industry’s standard dummy'
                },
              },
            ],
          },



        ],
      }
    ]
  }
  onSubmit() {

    console.log(this.form);
  }
}
