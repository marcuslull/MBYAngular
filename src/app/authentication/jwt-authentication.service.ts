import {Injectable} from '@angular/core';
import {JwtToken} from "./jwt-token";

@Injectable({
  providedIn: 'root'
})
export class JwtAuthenticationService {

  getDecryptedJwtString() :String | null {
    // retrieveJwt()
    // decryptJwtString(encryptedToken: String)
    // return the decrypted token string
    return null
  }

  saveJwtTokenToLocalStorage(tokenString: String) :void {
    // decodeJwtString(decryptedTokenString: String)
    this.decodeJwtString(tokenString);
    // saveJwt(jwtToken: JwtToken)
  }

  logout() :void {
    // delete any tokens in local storage
  }

  isLoggedIn() :boolean {
    // getJwtExpiration()
    // compare to now
    return false;
  }

  private decodeJwtString(decryptedTokenString: String) :JwtToken | null {
    // extract the data required to build JwtToken from th decrypted token string
    console.log(JSON.parse(atob(decryptedTokenString.split('.')[1])));
    // encryptJwtString(decryptedToken: String)
    // create Jwt object with the data
    // return JwtToken
    return null;
  }

  private saveJwt(jwtToken: JwtToken) : void {
    // save the token to local storage
  }

  private retrieveJwt() :JwtToken | null{
    // get the token from local storage
    // return the token
    return null;
  }

  private getJwtExpiration() :Number | null{
    // retrieveJwt()
    // extract the expiration date
    // return the date
    return null;
  }

  private encryptJwtString(decryptedTokenString: String) :String | null {
    // encrypt the clear token string
    // return encrypted token string
    return null;
  }

  private decryptJwtString(encryptedTokenString: String) :String | null {
    // decrypt the encrypted token string
    // return the decrypted token string
    return null;
  }
}
