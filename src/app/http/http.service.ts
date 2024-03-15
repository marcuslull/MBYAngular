import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JwtAuthenticationService} from "../authentication/jwt-authentication.service";
import {Router} from "@angular/router";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl: string = "https://mbyapisec-7cxa644xka-uc.a.run.app/"
  // private baseUrl: string = "http://localhost:8080/"
  private apiUrl: string = "api/"

  private email: string = "";
  private password: string = "";

  constructor(private httpClient: HttpClient,
              private jwtAuthenticationService: JwtAuthenticationService,
              private router: Router) {
  }

  login(endpoint: string, email: string, password: string): Observable<string> {
    // interceptor needs these creds
    this.email = email;
    this.password = password;
    let path = this.baseUrl + endpoint;
    return this.httpClient.post<string>(path, null)
  }

  postRegistration(endpoint: string, registration: User): Observable<User> {
    let path = this.baseUrl + endpoint;
    return this.httpClient.post<User>(path, registration)
  }

  getAll(endpoint: string): Observable<object[]> {
    this.checkLogonStatus();
    let path: string = this.baseUrl + this.apiUrl + endpoint;
    return this.httpClient.get<object[]>(path);
  }

  get(endpoint: string): Observable<object> {
    this.checkLogonStatus();
    let path: string = this.baseUrl + this.apiUrl + endpoint;
    return this.httpClient.get<object>(path);
  }

  post(endpoint: string, object: Object): Observable<object> {
    this.checkLogonStatus();
    let path: string = this.baseUrl + this.apiUrl + endpoint;
    return this.httpClient.post(path, object);
  }

  delete(endpoint: string): Observable<object> {
    this.checkLogonStatus();
    let path: string = this.baseUrl + this.apiUrl + endpoint;
    return this.httpClient.delete(path);
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  clearUserPass(): void {
    this.email = "";
    this.password = "";
  }

  private checkLogonStatus(): void {
    if (!this.jwtAuthenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
