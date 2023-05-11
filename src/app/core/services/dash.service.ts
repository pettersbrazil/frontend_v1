import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashService {

    constructor(
        private http: HttpClient
    ) {}

    public getTutors(): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/dash/tutors`);
    }

    public getPets(): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/dash/pets`);
    }

    public getScanners(): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/dash/scanners`);
    }
}
