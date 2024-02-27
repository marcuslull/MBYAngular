import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("****************INTERCEPTOR*************************")
    const username = "user@email.com";
    const password = "1234";
    const encodedCredentials = btoa(username + ':' + password);
    const authHeader = `Basic ${encodedCredentials}`;

    const authReq = req.clone({
      setHeaders: { Authorization: authHeader },
    });

    return next.handle(authReq).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
    } else {
      // Backend returned an unsuccessful response code.
      const errorMessage =
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
      return throwError(errorMessage);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
