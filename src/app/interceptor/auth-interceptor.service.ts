import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith("/token")) {
      const username = "user@email.com";
      const password = "1234";
      const encodedCredentials = btoa(username + ':' + password);
      const authHeader = `Basic ${encodedCredentials}`;
      const authReq = req.clone({
        setHeaders: { Authorization: authHeader },
        responseType: "text"
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
