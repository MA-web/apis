import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import Swal from 'sweetalert2';
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: "root"
})
export class HandleErrorService {

  constructor(
    private toaster: ToastrService,
    private _sharedService:SharedService
    ) { }

  // Handling HTTP Errors using Toaster
  public handleError(error: HttpErrorResponse) {
    if (error.error) {
      let errMessage = ""
      this._sharedService.sendError.next(error)
      if (error.error.error || error.error.message) {
         errMessage = error.error.content || error.error.error || error.error.message
        this.toaster.error(errMessage,)
      } else if (error.error.content) {
        Swal.fire({
          icon: 'error',
          text: JSON.stringify(error.error.content) ,
          showConfirmButton: true,
          timer: 2500
        })
      }else{
         errMessage = error.error.description
         this.toaster.error(errMessage,)
      }
    }


    if (error.status == 401) {
      //this.AuthService.logout()
      // window.location.reload()

    }


  }

}
