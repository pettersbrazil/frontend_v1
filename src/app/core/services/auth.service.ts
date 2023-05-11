import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';
import { IPasswordReset } from 'src/app/shared/interfaces/IPasswordReset.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    token!: string | null;
    logged!: boolean | null;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    setToken(token: string) {
        this.token = token;
        this.logged = true;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('logged', 'true');
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    isLogged(): boolean {
        let isLogged = false;
        if (this.token && this.logged) {
            isLogged = true;
        } else if(sessionStorage.getItem('logged') == 'true' && sessionStorage.getItem('token') != '') {
            isLogged = true;
        }
        return isLogged;
    }

    login(data: IUser) {
        return this.http.post(`${environment.apiHost}/auth/login`, data);
    }

    register(data: IUser) {
        return this.http.post(`${environment.apiHost}/auth/register`, data);
    }

    recoverPassword(data: IUser) {
        return this.http.post(`${environment.apiHost}/auth/recover-password`, data);
    }

    changePassword(data: IPasswordReset) {
        return this.http.post(`${environment.apiHost}/auth/change-password`, data);
    }

    logout(): void {
      this.logged = false;
      sessionStorage.clear();
      this.router.navigate(['/inicio']);
    }
}
