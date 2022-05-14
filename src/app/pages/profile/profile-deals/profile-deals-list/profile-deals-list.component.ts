import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deals-list',
  templateUrl: './profile-deals-list.component.html',
  styleUrls: ['./profile-deals-list.component.scss']
})
export class ProfileDealsListComponent extends AppBaseComponent implements OnInit {



  constructor(
    injector: Injector,
    private route:ActivatedRoute
   ) {
    super(injector);



  }

  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();

    this.route.url.subscribe((url:any) =>{
      this.breadcrumbItems = [
        { label: this._translateService.instant('Deals')},
        { label: this._translateService.instant(url[0]?.path), active: true },
      ]
  })

    this.fields = [
      {
        className:'col-12',
        key: 'firstName',
        type: 'input',
        templateOptions: {
          placeholder: this._translateService.instant('Search_product_profile')
        }
      },
      {
        className:'col-12 mb-2',
        template: `<span class="mb-0 font-weight-bold main-color">${this._translateService.instant('FilterBy')}:</span>`,
      },
      {
        className:'col-md-4 col-12',
        key: 'category',
        type: 'select',
        templateOptions: {
          placeholder: this._translateService.instant('category'),
          options:[]
        }
      },
      {
        className:'col-md-4 col-12',
        key: 'status',
        type: 'select',
        templateOptions: {
          placeholder: this._translateService.instant('status'),
          options:[]
        }
      },
    ]


  }




  onSubmit() {
    console.log(this.form)
    console.log(this.model);

  }
}
