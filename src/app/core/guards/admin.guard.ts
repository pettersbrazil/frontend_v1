import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private roleService: RoleService
  ) {}

  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.roleService.getRole()?.role !== 'admin') {
      this.router.navigate(['/acesso-negado']);
    }

    return true;
  }

  validRole(role: string, crud: string, option?: string) {
    const roles = this.roleService.getRole()?.data?.roles;

    if (!roles[role][crud]) {
      if (option) {
        this.router.navigate(['/acesso-negado']);
      }
      return false;
    }
    return true;
  }

}
