import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: any;
  username!: string | null;

  constructor(
    private http: HttpClient
  ) {}

  setUserId(userId: string) {
    sessionStorage.setItem('userId', userId);
  }

  getUserId() {
    return sessionStorage.getItem('userId');
  }

  setUsername(username: string) {
    this.username = username;
    sessionStorage.setItem('username', username);
  }

  getUsername() {
    return this.username ? this.username : sessionStorage.getItem('username');
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  public view(id: string | null): Observable<any> {
    return this.http.get<any>(`${env.apiHost}/users/${id}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(`${env.apiHost}/users`, data);
  }

  public all(type: string): Observable<any> {
    return this.http.get<any>(`${env.apiHost}/users?role=${type}`);
  }

  public edit(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${env.apiHost}/users/${id}`, data);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${env.apiHost}/users/${id}`);
  }
}
