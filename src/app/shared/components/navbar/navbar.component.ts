import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { AuthComponent } from 'src/app/pages/auth/auth.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modalAuth: MdbModalRef<AuthComponent> | null = null;

  isAdmin: boolean = false;
  isTutor: boolean = false;
  isCollapse: boolean = false;

  username!: string | null;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
    private modalService: MdbModalService
  ) { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.isCollapse = this.isCollapse ? false : true;
  }

  openModal() {
    this.modalAuth = this.modalService.open(AuthComponent, {
      modalClass: 'modal-dialog-centered'
    })
  }

  isLogged(): boolean {
    return this.authService.isLogged();
  }

  logout(): void {
    this.authService.logout();
  }

  getUsername()  {
    this.getRole();
    return this.userService.getUsername();
  }

  private getRole() {
    const r = this.roleService.getRole();

    this.isAdmin = r?.role === 'admin' ? true : false;
    this.isTutor = r?.role === 'tutor' ? true : false;
  }
}
