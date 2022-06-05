import { Component,  Injector,  OnDestroy,  OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { AuthenticationRequest, AuthenticationResponse, JwtAuthenticationControllerService, RegisterControllerService, ResponseDto, UserEmailDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AppBaseComponent implements OnInit , OnDestroy{


  constructor(
    injector: Injector,
    private JwtAuthenticationControllerService: JwtAuthenticationControllerService,
    private RegisterControllerService: RegisterControllerService
    ){
    super(injector);

    if(this._sharedService.checkToken()){
        this.router.navigate(['/home'])
    }
  }

  async ngOnInit(){
    this._sharedService.sendEmail.next(undefined)
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: this._translateService.instant('email'),
          placeholder: this._translateService.instant('emailPlaceHolder'),
          icon: 'mail.svg',
          required: true,
          pattern: generalValidations.email
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.email')}`,
          },
        },
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('password'),
          icon: 'password.svg',
          required: true,
          minLength:3,
          autoComplete:true
        }
      }
    ]

    const sendErrorSub = this._sharedService.sendError.subscribe(err =>{
      if(err?.error?.message ==="User with provided email is disabled"){

        let UserEmailDto: UserEmailDto = {
          email: this.model?.email
        }
        const resendTokenUsingPUTSub =  this.RegisterControllerService.resendTokenUsingPUT(UserEmailDto).subscribe((res: ResponseDto) => {
         if(res.statusCode == 200){
          this.toaster.success(this._translateService.instant('WeHaveSentYouVerificationCode'))
          window.localStorage.setItem('emailToAPIs', this.model?.email)
          this._sharedService.sendEmail.next(this.model?.email);
          this.router.navigate(['/auth/confirm-signup'])
         }


        })
        this.unSubscription.push(resendTokenUsingPUTSub)
      }
    })
    this.unSubscription.push(sendErrorSub)
  }


  onSubmit() {
    this.isSubmit = true;
    let UserRequestDto: AuthenticationRequest = {
      email: this.model?.email,
      password: this.model?.password,

    }

    const addCustomerUsingPOSTSub = this.JwtAuthenticationControllerService.createAuthenticationTokenUsingPOST(UserRequestDto).pipe(
      finalize(() =>{
        this.isSubmit = false;
      })
    ).subscribe((res: AuthenticationResponse) => {
      if(res){
        const userInfo = this._sharedService.getDecodedAccessToken(res?.token)
        this._sharedService.saveToken(res?.token)
        this._sharedService.saveUser(userInfo)
        this.router.navigate(['/home'])
      }
    })
    this.unSubscription.push(addCustomerUsingPOSTSub)
  }
}
