import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import { AuthService } from 'src/app/core/services/auth.service';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() dataRegister: any;
  @Output() changed = new EventEmitter<any>();

  registerForm!: FormGroup;

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

  checked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(6)]],
      confirmPassword: [null, [Validators.required, Validators.min(6)]],
      checkbox: [null, [Validators.required]]
    },{ validators: this.checkPasswords })
  }

  login(): void {
    this.changed.emit(true);
  }

  onSubmit():void {
    const data: IUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.isAlert = false;
    this.isLoading = true;

    this.authService.register(data)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'Seu cadastro foi realizado com sucesso! Agora você já pode logar em nosso site.'
        });
        this.isForm = false;
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
