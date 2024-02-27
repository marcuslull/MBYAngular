import { Injectable } from '@angular/core';
import {JwtToken} from "./jwt-token";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  getJwt() :String | null {
    return null
  }

  setJwt(token: String) :void {
  }

  logout() :void {
  }

  isLoggedIn() :boolean {
    return false;
  }

  getJwtExpiration() :Number | null{
    return null;
  }

  jwtStringToToken(token :String) :JwtToken | null {
    return null;
  }

  private encryptJwtString(clearToken: String) :String | null {
    return null;
  }

  private decryptJwtString(encryptedToken: String) :String | null {
    return null;
  }
}
