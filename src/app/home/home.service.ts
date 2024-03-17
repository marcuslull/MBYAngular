import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  breadcrumbText: string = "";
  loggedIn: boolean = false;
  fabIsDisabled: boolean = false;
}
