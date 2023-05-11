import { Injectable } from '@angular/core';
import { CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
 
  constructor(
    private authService: AuthService
  ) {}
 
  canActivateChild(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   
    if (!this.authService.isLogged()) {
      this.authService.logout();
    }
   
    return this.authService.isLogged();
  }
 
}
