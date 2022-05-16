import { Component, OnInit } from '@angular/core';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-invoice',
  templateUrl: './profile-deal-invoice.component.html',
  styleUrls: ['./profile-deal-invoice.component.scss']
})
export class ProfileDealInvoiceComponent extends AppBaseComponent implements OnInit {


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
