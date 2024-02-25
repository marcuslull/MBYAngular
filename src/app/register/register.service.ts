import {Injectable} from '@angular/core';
import {Registration} from "./registration";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  postRegistration(registration: Registration) :void {
    console.log(JSON.stringify(registration))
  }
}
