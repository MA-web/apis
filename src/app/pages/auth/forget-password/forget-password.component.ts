import { Component,  Injector,  OnDestroy,  OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { RegisterControllerService, ResponseDto, UserEmailDto } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent extends AppBaseComponent implements OnInit, OnDestroy {

  constructor(
    injector: Injector,
    private RegisterControllerService: RegisterControllerService
  ) {
    super(injector);
  }
  async ngOnInit(){
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          placeholder: this._translateService.instant('emailPlaceHolder'),
          icon: 'mail.svg',
          required: true,
          autoComplete:true,
          pattern: generalValidations.email
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.email')}`,
          },
        },
      },
    ]
  }


  onSubmit() {
    this.isSubmit = true
    let body:UserEmailDto= {
      email: this.model?.email
    }
    this.RegisterControllerService.sendPasswordTokenUsingPUT(body).pipe(
      finalize(() =>{
        this.isSubmit = false;
      })
    ).subscribe((res:ResponseDto) =>{
      if(res){
        window.localStorage.setItem('emailToAPIs_forgetPassword',this.model?.email)
        this._sharedService.sendEmail.next(this.model?.email);
        if(res) this.router.navigate(['/auth/confirm-rest-password'])

      }
    })
  }
}
