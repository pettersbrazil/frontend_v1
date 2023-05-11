import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

import { PetService } from 'src/app/core/services/pet.service';
import { UserService } from 'src/app/core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { Status } from 'src/app/core/utils/status';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userDetailForm!: FormGroup;

  admin: boolean = false;
  isDelete: boolean = false;

  isAlert: boolean = false;
  isLoading: boolean = false;

  status!: string;
  message!: string;

  user!: any;
  pets!: any;
  userRoles!: any;

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
    public modalDetail: MdbModalRef<UserDetailComponent>,
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private userService: UserService,
    private roleService: RoleService,
    private petService: PetService,
    private adminGuard: AdminGuard,
    private utilStatus: Status
  ) {}

  ngOnInit(): void {
    this.utilStatus.set({});
    this.createForm();
    this.getUser();
  }

  createForm(): void {
    this.userDetailForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  private getUser() {
    this.user = this.userService.getUser();
    this.admin = this.user.role === 'admin' ? true : false;

    this.userDetailForm.controls['name'].disable();
    this.userDetailForm.controls['email'].disable();
    this.userDetailForm.controls['phone'].disable();

    this.userDetailForm.patchValue({
      name: this.user.name,
      email: this.user.email
    });

    if (this.user.role === 'admin') {
      this.getRoles(this.user._id);
    } else {
      this.getPets(this.user._id);
      this.getContact(this.user._id);
    }
  }

  private getContact(userId: string) {
    this.contactService.view(userId)
    .subscribe(
      (c: any) => {
        this.userDetailForm.patchValue({
          phone: c.data?.phone
        });
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getPets(userId: string) {
    this.petService.getAll(userId)
    .subscribe(
      (p: any) => {
        this.pets = p.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private getRoles(userId: string) {
    this.isLoading = true;
    this.roleService.view(userId)
    .subscribe(
      (r: any) => {
        this.isLoading = false;
        this.userRoles = r.data;
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private deleteRoles(roleId: string) {
    this.roleService.delete(roleId)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'Administrador excluído com sucesso!'
        });
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  private saveRoles(userId: string, roles: any) {
    this.roleService.edit(userId, roles)
    .subscribe(
      () => {
        this.alert({
          status: 'success',
          message: 'As permissões foram atualizadas com sucesso!'
        });
      },
      e => {
        this.alert({
          status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
          message: e.error.message
        });
      }
    )
  }

  isChecked(role: any, crud: string) {
    return role === 'admin'
      ? Boolean(this.userRoles.roles.admin[crud])
      : Boolean(this.userRoles.roles.tag[crud]);
  }

  deleteUser(): void {
    if (this.validRole('admin', 'delete')) {
      this.userService.delete(this.user._id)
      .subscribe(
        () => {
          this.deleteRoles(this.userRoles._id);
        },
        e => {
          this.alert({
            status: e.status === 404 || e.status === 422 ? 'warning' : 'error',
            message: e.error.message
          });
        }
      )
    }
  }

  onSubmit(): void {
    if (this.validRole('admin', 'update')) {
      const roles = this.userRoles.roles;
      this.saveRoles(this.userRoles._id, { roles });
    }
  }

  validRole(role: string, crud: string): boolean {
    return this.adminGuard.validRole(role, crud);
  }

  private alert(data: any) {
    this.utilStatus.set({
      isReload: true,
      isLoading: true,
      isAlert: true,
      status: data.status,
      message:  data.message
    });
    this.modalDetail.close();
  }
}
