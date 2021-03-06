import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  NavService } from '../services/nav.service';


// Menu
 interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  children?: Menu[];
  icon?: string;
}


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  public menuItems: Menu[] =[];

  constructor(
    private router: Router,
    public navServices: NavService,
    @Inject(DOCUMENT) public document: Document,
    private translateService: TranslateService
    ) {

  }

  async ngOnInit(){
    await this.translateService.get('dummyTranslation').toPromise().then();
    this.menuItems =  [

      {
        path: '/home', title: this.translateService.instant('Home'), type: 'link', icon: 'fa fa-home'
      },
      {
        path: '/about-us', title: this.translateService.instant('AboutUs'), type: 'link', icon: 'fa fa-info-circle'
      },
      {
        path: '/products', title: this.translateService.instant('Products'), type: 'link', icon: 'fa fa-filter'
      },
      {
        path: '/news', title: this.translateService.instant('News'), type: 'link', icon: 'fa fa-file-text-o'
      },
      {
        path: '/events', title: this.translateService.instant('Events'), type: 'link', icon: 'fa fa-calendar-check-o'
      },
      {
        path: '/contact-us', title: this.translateService.instant('ContactUs'), type: 'link', icon: 'fa fa-phone'
      },

    ];

    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item:any) {
    item.active = !item.active;
  }

  onHover(menuItem:any) {
    if(window.innerWidth > 1200 && menuItem){
       this.document.getElementById('unset')?.classList.add('sidebar-unset')
    } else {
      this.document.getElementById('unset')?.classList.remove('sidebar-unset')
    }
  }

}
