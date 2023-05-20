import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/shared/interfaces/ITag.interface';

@Injectable({
    providedIn: 'root'
})
export class TagService {

  tag: any;

  constructor(
    private http: HttpClient
  ) {}

  setTag(tag: ITag | null) {
    this.tag = tag;
  }

  getTag() {
    return this.tag;
  }

  public getAll(status?: string): Observable<any> {
    const params = status ? `?status=${status}` : '';
    return this.http.get<any>(`${env.apiHost}/tags${params}`);
  }

  public findOne(petId: string, code: string, secret: string): Observable<any> {
    const params = `petId=${petId}&code=${code}&secret=${secret}`;
    return this.http.get<any>(`${env.apiHost}/tags/findOne?${params}`);
  }

  public create(data: any): Observable<any> {
    return this.http.post<any>(`${env.apiHost}/tags`, data);
  }

  public update(code: string, data: ITag): Observable<ITag> {
    return this.http.patch<any>(`${env.apiHost}/tags?code=${code}`, data);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete<any>(`${env.apiHost}/tags/${id}`);
  }
}
