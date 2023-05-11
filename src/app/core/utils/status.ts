import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Status {
  private _status!: any;

  public set(status: any) {
    this._status = status;
  }

  public get() {
    return this._status;
  }
}
