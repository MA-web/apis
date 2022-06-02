import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ItemCategoryDto } from 'src/app/@api';
import { Router } from '@angular/router';


const TOKEN_KEY = 'token';
const REFRESH_TOKEN_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user-info';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // send email to verify  code after register
  sendEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // send verify from confirm to new password
  sendVerifyCode: BehaviorSubject<string> = new BehaviorSubject<string>('');

  //send error
  sendError: Subject<any> = new Subject<any>();


  //send refresh
  sendRefresh: Subject<any> = new Subject<any>();

  //send empty dropzone
  dropzoneEmptySubj = new Subject();

  //empty attach
  sendEmptyAttach: Subject<any> = new Subject<any>();

  //send inbox
  sendInbox: Subject<any> = new Subject<any>();

  //refresh inbox
  RefreshInbox: Subject<any> = new Subject<any>();


  //remove index From Upload area
  removeIndexFromUploadArea: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    private router:Router
    ) { }


  getBlob(src: any) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.get(src, { headers: headers, responseType: 'blob' });
  }


  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  signOut(): void {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    this.router.navigate(['/home'])
    setTimeout(() => {
      window.location.reload()
    }, 100);
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user) {
      this.saveUser(user);
    }
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  checkToken(): boolean {
    if (window.localStorage.getItem(TOKEN_KEY)) {
      return true
    }
    return false
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return undefined;
  }

  getBlobIcon(src_icon) {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.get(src_icon, { headers: headers, responseType: 'blob' });
  }
}
