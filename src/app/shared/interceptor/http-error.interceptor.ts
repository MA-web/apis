import { SharedService } from './../services/shared.service';
import { EMPTY } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from '../services/handle-error-service';


export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private HandleErrorService:HandleErrorService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(

        catchError((error: HttpErrorResponse) => {
          this.HandleErrorService.handleError(error)

          return throwError(EMPTY);
        })
      )
  }

}
