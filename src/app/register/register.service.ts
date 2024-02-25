import {Injectable} from '@angular/core';
import {Registration} from "./registration";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = "http://localhost:8080/register"
  constructor(private httpClient: HttpClient) {}
  postRegistration(registration: Registration) :void{
    this.httpClient.post<Registration>(this.apiUrl, registration, { observe: 'response' })
      .subscribe(response => {
        console.log(response.status + " " + response.statusText)
      })
  }
}
