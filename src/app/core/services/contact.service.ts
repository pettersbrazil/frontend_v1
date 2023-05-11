import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IContactUs } from 'src/app/shared/interfaces/IContactUs.interface';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(
        private http: HttpClient
    ) {}

    public send(data: IContactUs): Observable<any> {
        return this.http.post<any>(`${env.apiHost}/contact-us`, data);
    }

    public view(id: string): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/contacts?userId=${id}`);
    }

    public create(data: any): Observable<any> {
      return this.http.post<any>(`${env.apiHost}/contacts`, data);
    }

    public edit(id: string, data: any): Observable<any> {
        return this.http.put<any>(`${env.apiHost}/contacts/${id}`, data);
    }
}
