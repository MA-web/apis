import { Component, Injector, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AccountConfirmationToken, RegisterControllerService, ResponseDto, UserEmailDto, UserResponseDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import Swal from 'sweetalert2';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-activation-email',
  templateUrl: './activation-email.component.html',
  styleUrls: ['./activation-email.component.scss']
})
export class ActivationEmailComponent extends AppBaseComponent implements OnInit {

  email: string = '';

  constructor(
    injector: Injector,
    private RegisterControllerService: RegisterControllerService
  ) {
    super(injector);
    this._sharedService.sendEmail.subscribe((res: string) => {
      if (res || window.localStorage.getItem('emailToAPIs')) {
        if (res) {
          this.email = res
        } else {
          this.email = window.localStorage.getItem('emailToAPIs')
        }
      } else {
        this.router.navigate(['/auth/login'])
      }
    })
  }
  async ngOnInit() {

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'token',
        type: 'input',
        templateOptions: {
          type: 'text',
          placeholder: this._translateService.instant('verificationCode'),
          required: true,
        }
      },
    ]
  }

  onSendAgain() {
    let UserEmailDto: UserEmailDto = {
      email: this.email
    }
    let observable;
    if (this.router.url === '/auth/confirm-signup') {
      observable = this.RegisterControllerService.resendTokenUsingPUT(UserEmailDto)

    } else {
      observable = this.RegisterControllerService.sendPasswordTokenUsingPUT(UserEmailDto)
    }

    const resendTokenUsingPUTSub = observable.subscribe((res: ResponseDto) => {
      console.log('res: ', res);
      this.toaster.success('success')
    })
    this.unSubscription.push(resendTokenUsingPUTSub)
  }

  onSubmit() {
    this.isSubmit = true
    let body: AccountConfirmationToken = {
      token: this.model?.token
    }
    const verifyAccountUsingPUTSub = this.RegisterControllerService.verifyAccountUsingPUT(body).pipe(
      finalize(() => {
        this.isSubmit = false;
      })
    ).subscribe((res: UserResponseDto) => {
      if (res) {
        this.toaster.success(this._translateService.instant('Success'))
        if (this.router.url === '/auth/confirm-signup') {
          this.router.navigate(['/auth/login'])
        } else {
          this._sharedService.sendVerifyCode.next(this.model?.token)
          this.router.navigate(['/auth/new-password'])
        }

        this._sharedService.sendEmail.next(undefined)
        window.localStorage.removeItem('emailToAPIs')
        window.localStorage.removeItem('emailToAPIs_forgetPassword')
      }
    })
    this.unSubscription.push(verifyAccountUsingPUTSub)

  }
}
