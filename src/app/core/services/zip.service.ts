import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ZipService {

    constructor(
      private http: HttpClient,
    ) {}

    public search(zip: string): Observable<any> {
      return this.http.get<any>(`https://viacep.com.br/ws/${zip}/json`);
    }
}
