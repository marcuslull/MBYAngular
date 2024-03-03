import {Injectable} from '@angular/core';
import {JwtToken} from "./jwt-token";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  getJwtString() :string | null {
    return localStorage.getItem("token");
  }

  setJwtToken(tokenString: string) :void {
    localStorage.setItem("token", tokenString);
  }

  logout() :void {
    localStorage.clear();
  }

  isLoggedIn() :boolean {
    let tokenString :string | null = this.getJwtString();
    if (tokenString) {
      let jwt :JwtToken = this.decodeJwtString(tokenString);
      // @ts-ignore
      return jwt.exp > Math.floor(Date.now() / 1000);
    }
    this.logout()
    return false;
  }

  private decodeJwtString(tokenString: string) :JwtToken {
    let jwtToken: JwtToken = JSON.parse(atob(tokenString.split('.')[1]));
    jwtToken.tokenString = tokenString;
    return jwtToken;
  }
}
