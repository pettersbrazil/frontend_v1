import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) {}

  public view(userId: string): Observable<any> {
    return this.http.get<any>(`${env.apiHost}/profiles?userId=${userId}`);
  }

  public edit(userId: string, data: any): Observable<any> {
    return this.http.patch<any>(`${env.apiHost}/profiles?userId=${userId}`, data);
  }
}
