import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  @Output() changed = new EventEmitter<any>();

  recoverPasswordForm!: FormGroup;

  isRecoverPassword: boolean = true;
  isChangePassword: boolean = false;

  isAlert: boolean = false;
  isLoading: boolean = false;

  status!: string;
  message!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.recoverPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    })
  }

  login(): void {
    this.changed.emit(false);
  }

  onSubmit():void {
    const data: IUser = {
      email: this.recoverPasswordForm.value.email
    };

    this.isAlert = false;
    this.isLoading = true;

    this.authService.recoverPassword(data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'Foi enviado um código de recuperação para o seu e-mail.'
        });
        this.isRecoverPassword = false;
        this.isChangePassword = true;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.isLoading = false;
    this.isAlert = true;
    this.status = data.status;
    this.message = data.message;
  }
}
