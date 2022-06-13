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
    console.log('error: ', error);
    if(!error?.message?.includes("count")){
      if (error.error) {
        let errMessage = ""
        this._sharedService.sendError.next(error)
        if (error.error.error || error.error.message) {
           errMessage = error.error.content || error.error.error || error.error.message
          this.toaster.error(errMessage,)
        } else if (error.error.description) {
          errMessage = error.error.description
          this.toaster.error(errMessage,)
        }
         else if (error.error.content) {
          Swal.fire({
            icon: 'error',
            text: JSON.stringify(error.error.content) ,
            showConfirmButton: true,
            timer: 100000
          })
        }else{
          this.toaster.error("Internal Server Error!")
          Swal.fire({
            icon: 'error',
            title:'Oops. Something went wrong',
            text: JSON.stringify("Please try again later") ,
            showConfirmButton: true,
          })
        }
      }
    }



    if (error.status == 401 && error.error.message !=="Invalid email or password") {
      this._sharedService.signOut()
    }


  }

}
