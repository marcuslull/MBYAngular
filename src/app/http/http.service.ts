import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "http://localhost:8080/api/"

  constructor(private httpClient: HttpClient,
              private jwtAuthenticationService: JwtAuthenticationService,
              private router: Router) { }

  getAll(endpoint: string) :Observable<object[]> {
    this.checkLogonStatus();
    let path: string = this.apiUrl + endpoint;
    return this.httpClient.get<object[]>(path);
  }

  get(endpoint: string, id: number) :Observable<object> {
    this.checkLogonStatus();
    let path: string = this.apiUrl + endpoint + "/" + id;
    return this.httpClient.get<object>(path);
  }

  private checkLogonStatus() :void {
    if (!this.jwtAuthenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
