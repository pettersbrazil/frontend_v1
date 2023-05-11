import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent
  ]
})
export class AuthModule { }
