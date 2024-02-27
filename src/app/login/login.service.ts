import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = "http://localhost:8080/token"
  constructor(private httpClient: HttpClient) {}
  login() :Observable<String>{
    return this.httpClient.post<String>(this.apiUrl, null)
  }
}
