import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "http://localhost:8080/register"
  constructor(private httpClient: HttpClient) {}
  postRegistration(registration: User) :Observable<User>{
    return this.httpClient.post<User>(this.apiUrl, registration)
  }
}
