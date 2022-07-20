import { DOCUMENT } from '@angular/common';
import { Component, Inject, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { NavService } from '../services/nav.service';


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
export class LeftMenuComponent extends AppBaseComponent implements OnInit {

  public menuItems: Menu[] = [];

  constructor(
    injector: Injector,
    public navServices: NavService,
    @Inject(DOCUMENT) public document: Document,
  ) {
    super(injector)
  }

  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.menuItems = [

      {
        path: '/home', title: this._translateService.instant('Home'), type: 'link', icon: 'fa fa-home'
      },
      {
        path: '/about-us', title: this._translateService.instant('AboutUs'), type: 'link', icon: 'fa fa-info-circle'
      },
      {
        path: '/products', title: this._translateService.instant('Products'), type: 'link', icon: 'fa fa-filter'
      },

      {
        path: '/news', title: this._translateService.instant('News'), type: 'link', icon: 'fa fa-file-text-o'
      },
      {
        path: '/events', title: this._translateService.instant('Events'), type: 'link', icon: 'fa fa-calendar-check-o'
      },
      {
        path: '/contact-us', title: this._translateService.instant('ContactUs'), type: 'link', icon: 'fa fa-phone'
      },

    ];
    const insert = (arr, index, newItem) => [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // part of the array after the specified index
      ...arr.slice(index)
    ]
    if(this.userData){
      this.menuItems = insert(this.menuItems,3,{
        path: '/suppliers', title: this._translateService.instant('ourSuppliers'), type: 'link', icon: 'fa fa-american-sign-language-interpreting'
      })
    }

    this.router.events.subscribe((event) => {
      this.navServices.mainMenuToggle = false;
    });
  }

  onSignOut() {
    this._sharedService.signOut()
  }


  leftMenuToggle(): void {
    this.navServices.leftMenuToggle = !this.navServices.leftMenuToggle;
  }

  // Click Toggle menu (Mobile)
  toggletNavActive(item: any) {
    item.active = !item.active;
  }

  onHover(menuItem: any) {
    if (window.innerWidth > 1200 && menuItem) {
      this.document.getElementById('unset')?.classList.add('sidebar-unset')
    } else {
      this.document.getElementById('unset')?.classList.remove('sidebar-unset')
    }
  }

}
