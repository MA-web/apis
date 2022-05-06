import { HostListener, Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class NavService {


  public screenWidth: any;
  public leftMenuToggle: boolean = false;
  public mainMenuToggle: boolean = false;

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
  }





}
