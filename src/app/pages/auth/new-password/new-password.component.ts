import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { RegisterControllerService, ResetPasswordDto, ResponseDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent extends AppBaseComponent implements OnInit , OnDestroy{

  VerifyCode: string = '';


  constructor(
    injector: Injector,
    private RegisterControllerService: RegisterControllerService
  ) {
    super(injector);

  }

  async ngOnInit() {

    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('password'),
          icon: 'password.svg',
          required: true,
          pattern: generalValidations.password
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.password')}`,
          },
        },
      },
      {
        key: 'rePassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          icon: 'password.svg',
          label: `${this._translateService.instant('rePassword')}`,
        },
        validators: {
          fieldMatch: {
            expression: (control: any) => control.value === this.model.password,
            message: this._translateService.instant('validations.PasswordNotMatching'),
          },
        },
        expressionProperties: {
          'templateOptions.disabled': () => !this.form.get('password')?.valid,
        }
      },
    ]

    setTimeout(() => {
    const sendVerifyCodeSub =  this._sharedService.sendVerifyCode.subscribe((res: string) => {

        if (res) {
          this.VerifyCode = res;
        } else {
          this.router.navigate(['/auth/login'])
        }
      })
      this.unSubscription.push(sendVerifyCodeSub)
    }, 100);
  }


  onSubmit() {
    this.isSubmit = true
    if(this.VerifyCode){
      let body: ResetPasswordDto = {
        password: this.model?.password,
        token: this.VerifyCode
      }
     const resetPasswordUsingPUTSub = this.RegisterControllerService.resetPasswordUsingPUT(body).pipe(
        finalize(() => {
          this.isSubmit = false;
        })
      ).subscribe((res: ResponseDto) => {
        if (res) {
          Swal.fire({
            icon: 'success',
            title: 'Success !',
            timer: 1500
          })
          this.router.navigate(['/auth/login'])

          this._sharedService.sendVerifyCode.next(undefined)
        }
      })
      this.unSubscription.push(resetPasswordUsingPUTSub)
    }
  }

}
