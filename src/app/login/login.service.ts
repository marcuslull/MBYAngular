import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = "https://mbyapisec-7cxa644xka-uc.a.run.app/token"
  // private apiUrl: string = "http://localhost:8080/token"
  private email: string = "";
  private password: string = "";

  constructor(private httpClient: HttpClient) {
  }

  login(email: string, password: string): Observable<string> {
    this.email = email;
    this.password = password;
    return this.httpClient.post<string>(this.apiUrl, null)
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
}
