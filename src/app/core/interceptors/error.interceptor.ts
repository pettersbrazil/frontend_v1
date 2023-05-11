import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor {

    constructor(
      private router: Router,
      private auth: AuthService
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(() => { },
        (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status === 403) {
                this.router.navigate(['/acesso-negado']);
              } else if (err.status === 401) {
                this.auth.logout();
              }
            }
            return;
        }))
    }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
