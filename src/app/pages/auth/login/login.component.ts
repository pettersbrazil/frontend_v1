import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { AuthComponent } from '../auth.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { PetService } from 'src/app/core/services/pet.service';
import { TagService } from 'src/app/core/services/tag.service';
import { RoleService } from 'src/app/core/services/role.service';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';
import { ITag } from 'src/app/shared/interfaces/ITag.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() dataLogin: any;
  @Output() changed = new EventEmitter<any>();

  loginForm!: FormGroup;

  isAlert: boolean = false;
  isLoading: boolean = false;
  isRecoverPassword: boolean = false;

  status!: string;
  message!: string;

  user!: IUser;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private tagService: TagService,
    private petService: PetService,
    public modalAuth: MdbModalRef<AuthComponent>
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.min(6)]]
    })
  }

  login(event: any) {
    this.isRecoverPassword = event;
    this.dataLogin.isLogin = true;
  }

  recoverPassword(): void {
    this.isRecoverPassword = true;
    this.dataLogin.isLogin = false;
  }

  onSubmit(): void {
    const data: IUser = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.isAlert = false;
    this.isLoading = true;

    this.signIn(data);
  }

  private signIn(data: IUser) {
    this.authService.login(data)
    .subscribe(
      (l: any) => {
        this.authService.setToken(l.data.token);
        this.userService.setUserId(l.data.userId);
        this.getUser();
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getUser() {
    const userId = this.userService.getUserId();
    this.userService.view(userId)
    .subscribe(
      (u: any) => {
        const tag = this.tagService.getTag();
        this.userService.setUsername(u.data.name);
        this.getRole(u.data._id, u.data.role);
        this.user = u.data;
        if (tag) {
          this.bindPet();
        } else {
          this.isAlert = false;
          this.isLoading = false;
          this.modalAuth.close();
        }
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getRole(userId: string, role: string) {
    this.roleService.view(userId)
    .subscribe(
      (r: any) => {
        this.roleService.setRole({
          role,
          data: r.data
        });
        this.isAlert = false;
        this.isLoading = false;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private bindPet() {
    const data: IPet = {
      userId: this.user._id,
      createdAt: new Date()
    };

    this.petService.create(data)
    .subscribe(
      (pet: any) => {
        this.bindTag(pet.data);
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private bindTag(pet: IPet) {
    const tag = this.tagService.getTag();
    const data: ITag = {
      petId: pet._id,
      status: 'active'
    };

    this.tagService.update(tag._id, data)
    .subscribe(
      () => {
        this.isAlert = false;
        this.isLoading = false;
        this.modalAuth.close();
        this.router.navigate(['/perfil', pet._id]);
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
