import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from 'rxjs';
import {JwtAuthenticationService} from "./jwt-authentication.service";
import {HttpService} from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private jwtAuthenticationService: JwtAuthenticationService,
    private httpService: HttpService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith("/token")) {
      const username: string = this.httpService.getEmail();
      const password: string = this.httpService.getPassword();
      this.httpService.clearUserPass(); // for security's sake
      const encodedCredentials: string = btoa(username + ':' + password);
      const authHeader: string = `Basic ${encodedCredentials}`;
      const authReq = req.clone({
        setHeaders: {Authorization: authHeader},
        responseType: "text"
      });
      return next.handle(authReq);
    } else if (req.url.endsWith("/register")) {
      return next.handle(req);
    } else {
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
