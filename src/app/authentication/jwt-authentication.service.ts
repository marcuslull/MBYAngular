import {Injectable} from '@angular/core';
import {JwtToken} from "./jwt-token";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  private jwt: JwtToken | null = null;

  getJwtString() :string | null {
    if (this.jwt) {
      return this.jwt.tokenString
    }
    return null;
  }

  setJwtToken(tokenString: string) :void {
    this.jwt = this.decodeJwtString(tokenString);
    console.log("Logged in: " + this.isLoggedIn());
    console.log(this.jwt);
  }

  logout() :void {
    this.jwt = null;
  }

  isLoggedIn() :boolean {
    if (this.jwt) {
      // @ts-ignore
      return this.jwt.exp > Math.floor(Date.now() / 1000);
    }
    return false;
  }

  private decodeJwtString(tokenString: string) :JwtToken {
    let jwtToken: JwtToken = JSON.parse(atob(tokenString.split('.')[1]));
    jwtToken.tokenString = tokenString;
    return jwtToken;
  }
}
