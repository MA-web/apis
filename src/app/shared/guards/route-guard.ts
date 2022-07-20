import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {

  constructor(
      private _router: Router,
      private _sharedService:SharedService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      if (this._sharedService.getToken()) {
          return true;
      }else{
          this._router.navigate(['/auth/login'])
          return false;
      }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
  }



}
