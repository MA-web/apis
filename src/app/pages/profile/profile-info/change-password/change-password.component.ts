import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { PasswordChangeDto, ResponseDto, UserControllerService } from 'src/app/@api';
import { AppBaseComponent } from 'src/app/shared/components/app-base/app-base.component';
import { generalValidations } from 'src/environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends AppBaseComponent implements OnInit, OnDestroy {

  supplierId: number;

  constructor(
    injector: Injector,
    private UserControllerService: UserControllerService,
    public bsModalRef: BsModalRef
  ) {
    super(injector)
    this.isLoadingForm = true
  }
  async ngOnInit() {
    await this._translateService.get('dummyTranslation').toPromise().then();
    this.fields = [
      {
        className: 'col-12',
        key: 'oldPassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('oldPassword'),
          icon: 'password.svg',
          required: true,
          autocomplete:false
        },
      },
      {
        className: 'col-12',
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: this._translateService.instant('newPassword'),
          icon: 'password.svg',
          required: true,
          pattern: generalValidations.password,
          autocomplete:false
        },
        validation: {
          messages: {
            pattern: (error, field: FormlyFieldConfig) => `${this._translateService.instant('validations.password')}`,
          },
        },
      },
      {
        className: 'col-12',
        key: 'rePassword',
        type: 'input',
        templateOptions: {
          type: 'password',
          icon: 'password.svg',
          label: `${this._translateService.instant('rePassword')}`,
          autocomplete:false
        },
        validators: {
          fieldMatch: {
            expression: (control: any) => control.value === this.model.password,
            message: this._translateService.instant('validations.PasswordNotMatching'),
          },
        },

      },
    ]
  }

  onSubmit() {
    this.isSubmit = true;
    let chapasswordChangeDtot: PasswordChangeDto = {
      newPassword: this.model?.password,
      oldPassword: this.model?.oldPassword
    }
    const createChatUsingPOSTSub = this.UserControllerService.changePasswordUsingPUT(this._sharedService?.getToken(), chapasswordChangeDtot).pipe(
      finalize(() => {
        this.isSubmit = false;
      })
    ).subscribe((res: ResponseDto) => {

      if (res) this.bsModalRef.hide();
      this.toaster.success(this._translateService.instant("updatedSuccessfully"))
    })
    this.unSubscription.push(createChatUsingPOSTSub)
  }

}
