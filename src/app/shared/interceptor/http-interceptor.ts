import { TranslateService } from '@ngx-translate/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';



@Injectable()
export class HttpInterceptors implements HttpInterceptor {

    constructor(private _sharedService:SharedService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let header = {}
        if(window.localStorage.getItem('token')){
          header['Authorization'] = `Bearer ${ window.localStorage.getItem('token')}`
        }
        // header['Access-Control-Allow-Origin'] = `*`

        request = request.clone({
            setHeaders: header,
        });
        return next.handle(request);
    }
}
