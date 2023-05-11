import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IScanner } from 'src/app/shared/interfaces/IScanner.interface';

@Injectable({
    providedIn: 'root'
})
export class ScannerService {

    scanner: any;

    constructor(
        private http: HttpClient
    ) {}

    setScanner(scanner: any) {
        this.scanner = scanner;
    }

    getScanner() {
        return this.scanner;
    }

    public view(tagId: string): Observable<any> {
        return this.http.get<any>(`${env.apiHost}/scanners?tagId=${tagId}`);
    }

    public create(data: IScanner): Observable<any> {
        return this.http.post<any>(`${env.apiHost}/scanners`, data);
    }
}
