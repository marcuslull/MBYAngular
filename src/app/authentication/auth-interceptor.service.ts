import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {LoginService} from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith("/token")) {
      const username: string = this.loginService.getEmail();
      const password: string = this.loginService.getPassword();
      this.loginService.clearUserPass(); // for security's sake
      const encodedCredentials: string = btoa(username + ':' + password);
      const authHeader: string = `Basic ${encodedCredentials}`;
      const authReq = req.clone({
        setHeaders: { Authorization: authHeader },
        responseType: "text"
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
