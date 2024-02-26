import {Injectable} from '@angular/core';
import {Registration} from "./registration";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "http://localhost:8080/register"
  constructor(private httpClient: HttpClient) {}
  postRegistration(registration: Registration) :Observable<Registration>{
    return this.httpClient.post<Registration>(this.apiUrl, registration)
  }
}
