import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IAddress } from 'src/app/shared/interfaces/IAddress.interface';

@Injectable({
    providedIn: 'root'
})
export class AddressService {

    role!: string | null;
    username!: string | null;

    constructor(
        private http: HttpClient,
    ) {}

    public view(id: string): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/addresses?userId=${id}`);
    }

    public create(data: IAddress): Observable<any> {
        return this.http.post<any>(`${env.apiHost}/addresses`, data);
    }

    public edit(id: string, data: IAddress): Observable<any> {
        return this.http.put<any>(`${env.apiHost}/addresses/${id}`, data);
    }
}
