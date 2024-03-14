import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "https://mbyapisec-7cxa644xka-uc.a.run.app/register"
  // private apiUrl: string = "http://localhost:8080/register"

  constructor(private httpClient: HttpClient) {
  }

  postRegistration(registration: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, registration)
  }
}
