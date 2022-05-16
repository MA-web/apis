import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';

@Component({
  selector: 'app-profile-deal-details',
  templateUrl: './profile-deal-details.component.html',
  styleUrls: ['./profile-deal-details.component.scss']
})
export class ProfileDealDetailsComponent extends AppBaseComponent implements OnInit {

  dealType:string = 'inquiry';

  constructor(
    injector: Injector,
    private route:ActivatedRoute,

   ) {
    super(injector);
  }

  async ngOnInit() {
    this.route.url.subscribe((url: any) => {
      this.dealType = url[0]?.path
    })
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.breadcrumbItems = [
      { label: this._translateService.instant('Deals')},
      { label: `#${this.dealType} - 12666532`, active: true },
    ]
  }



}
