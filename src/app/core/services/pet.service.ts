import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IPet } from 'src/app/shared/interfaces/IPet.interface';

@Injectable({
    providedIn: 'root'
})
export class PetService {

    pet: any;

    constructor(
        private http: HttpClient
    ) {}

    setPet(pet: any) {
        this.pet = pet;
    }

    getPet() {
        return this.pet;
    }

    public getAll(userId?: string): Observable<any> {
        const params = userId ? `?userId=${userId}` : '';
        return this.http.get<any>(`${env.apiHost}/pets${params}`);
    }

    public show(id: string): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/pets/${id}`);
    }

    public create(data: IPet): Observable<any> {
        return this.http.post<any>(`${env.apiHost}/pets`, data);
    }

    public update(id: string, data: IPet): Observable<any> {
      return this.http.patch<any>(`${env.apiHost}/pets/${id}`, data);
    }
}
