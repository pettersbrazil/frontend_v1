import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  role: any;

  constructor(
    private http: HttpClient
  ) {}

  setRole(role: any) {
    this.role = role;
    sessionStorage.setItem('role', JSON.stringify(role));
  }

  getRole() {
    if (!this.role) {
      const role: any = sessionStorage.getItem('role');
      this.role = JSON.parse(role);
    }
    return this.role;
  }

  public view(userId: string): Observable<any> {
    return this.http.get<any>(`${env.apiHost}/roles?userId=${userId}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(`${env.apiHost}/roles`, data);
  }

  public edit(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${env.apiHost}/roles/${id}`, data);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${env.apiHost}/roles/${id}`);
  }
}
