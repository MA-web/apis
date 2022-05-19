import { SharedService } from './../services/shared.service';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';


export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap(res => {
          console.log('res: ', res);
          if (res instanceof HttpResponse) {

          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('error: ', error);
          if (error.error) {

            if (error.error.content || error.error.error) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: JSON.stringify(error.error.content) || JSON.stringify(error.error.error) ,
                showConfirmButton: true,
                timer: 2500
              })
            }
          }


          if (error.status == 401) {
            //this.AuthService.logout()
            // window.location.reload()

          }



          return throwError(true);
        })
      )
  }

}
