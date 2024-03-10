import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {LoginService} from "../login/login.service";
import {JwtAuthenticationService} from "./jwt-authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService, private jwtAuthenticationService: JwtAuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith("/token")) {
      console.log("Hit Token")
      const username: string = this.loginService.getEmail();
      const password: string = this.loginService.getPassword();
      this.loginService.clearUserPass(); // for security's sake
      const encodedCredentials: string = btoa(username + ':' + password);
      const authHeader: string = `Basic ${encodedCredentials}`;
      const authReq = req.clone({
        setHeaders: {Authorization: authHeader},
        responseType: "text"
      });
      return next.handle(authReq);
    } else if (req.url.endsWith("/register")) {
      console.log("Hit Register")
      return next.handle(req);
    } else {
      console.log("Hit anything else")
      const token: string | null = this.jwtAuthenticationService.getJwtString();
      if (token) {
        const cloned: HttpRequest<any> = req.clone({
          headers: req.headers.set("Authorization", "Bearer " + token)
        });
        return next.handle(cloned);
      }
      return next.handle(req);
    }
  }
}
