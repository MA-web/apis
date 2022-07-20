import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormlyConfModule } from 'src/app/shared/formly-conf/formly-conf.module';
import { AuthComponent } from './auth.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ActivationEmailComponent } from './activation-email/activation-email.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const route: Route[] = [
  {
    path: '', component: AuthComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'new-password', component: NewPasswordComponent },
      { path: 'confirm-signup', component: ActivationEmailComponent },
      { path: 'confirm-rest-password', component: ActivationEmailComponent }
    ]
  },

]

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    NewPasswordComponent,
    ActivationEmailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    TranslateModule,
    FormlyConfModule,
    NgxSkeletonLoaderModule
  ]
})
export class AuthModule { }
