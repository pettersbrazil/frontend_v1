import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: boolean = false;
  isTutor: boolean = false;

  roles: any;

  constructor(
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    this.getRole();
  }

  private getRole() {
    const roles = this.roleService.getRole();
    const role = roles?.role;

    this.roles = roles?.data?.roles;
    this.isAdmin = role === 'admin' ? true : false;
    this.isTutor = role === 'tutor' ? true : false;
  }

  validRole(role: string, crud: string) {
    if (!this.roles) this.getRole();
    return this.roles && this.roles[role][crud];
  }
}
