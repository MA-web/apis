import { TranslateService } from '@ngx-translate/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable()
export class HttpInterceptors implements HttpInterceptor {

    constructor(){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let header = {}
        // if (window.localStorage.getItem('lang')) {
        //     header['X-localization'] = window.localStorage.getItem('lang');
        //     header['lang'] = window.localStorage.getItem('lang');
        //     header['deviceType'] = 'web'
        //  }
        //  header['Authorization'] = `${this.cookie.getToken()}`

        request = request.clone({
            setHeaders: header,
        });
        return next.handle(request);
    }
}
