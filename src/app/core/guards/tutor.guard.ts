import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class TutorGuard implements CanActivateChild {

  constructor(
    private router: Router,
    private roleService: RoleService
  ) {}

  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.roleService.getRole()?.role !== 'tutor') {
      this.router.navigate(['/acesso-negado']);
    }

    return true;
  }

}
