import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { IPasswordReset } from 'src/app/shared/interfaces/IPasswordReset.interface';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Input() dataChangePassword: any;

  changePasswordForm!: FormGroup;

  isForm: boolean = true;
  isAlert: boolean = false;
  isLoading: boolean = false;

  status!: string;
  message!: string;

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      token: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, Validators.min(6)]]
    }, { validators: this.checkPasswords })
  }

  onSubmit():void {
    const data: IPasswordReset = {
      token: this.changePasswordForm.value.token,
      password: this.changePasswordForm.value.password
    };

    this.isAlert = false;
    this.isLoading = true;

    this.authService.changePassword(data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'Sua senha foi alterada com sucesso! Agora você já pode logar em nosso site.'
        });
        this.isForm = false;
        this.changePasswordForm.reset();
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
