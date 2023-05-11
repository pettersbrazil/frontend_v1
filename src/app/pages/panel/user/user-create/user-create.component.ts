import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';

import { Status } from 'src/app/core/utils/status';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  userCreateForm!: FormGroup;

  isLoading: boolean = false;

  roleNames = [
    {
      title: 'Administrador',
      role: 'admin',
      roles: [ 'create', 'read', 'update', 'delete' ]
    },
    {
      title: 'Pingente',
      role: 'tag',
      roles: [ 'create', 'read', 'update', 'delete' ]
    }
  ];

  constructor(
    public modalCreate: MdbModalRef<UserCreateComponent>,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private utilStatus: Status
  ) { }

  ngOnInit(): void {
    this.utilStatus.set({});
    this.createForm();
  }

  createForm(): void {
    this.userCreateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: null,
      // roles
      adminRoles: this.formBuilder.group({
        create: null,
        read: null,
        update: null,
        delete: null
      }),
      tagRoles: this.formBuilder.group({
        create: null,
        read: null,
        update: null,
        delete: null
      })
    })
  }

  onSubmit(): void {
    const data = {
      name: this.userCreateForm.controls.name.value,
      email: this.userCreateForm.controls.email.value,
      roles: {
        admin: this.userCreateForm.controls.adminRoles.value,
        tag: this.userCreateForm.controls.tagRoles.value
      }
    }
    this.saveUser(data);
  }

  private saveUser(data: any) {
    this.isLoading = true;
    this.userService.create(data)
    .subscribe(
      (u: any) => {
        this.saveRoles(u.data._id, data.roles);
      },
      e => {
        this.isLoading = false;
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private saveRoles(userId: string, roles: any) {
    const data = {
      userId,
      roles
    };

    this.roleService.create(data)
    .subscribe(
      () => {
        this.isLoading = true;
        this.alert({
          status: 'success',
          message: 'Administrador cadastrado com sucesso!'
        });
      },
      e => {
        this.isLoading = true;
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private alert(data: any) {
    this.utilStatus.set({
      isReload: true,
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
    this.modalCreate.close();
  }
}
