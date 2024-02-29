import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl: string = "http://localhost:8080/api/"

  constructor(private httpClient: HttpClient) { }

  getAll(endpoint: string) :Observable<object[]> {
    return this.httpClient.get<object[]>(this.apiUrl+endpoint)
  }
}
