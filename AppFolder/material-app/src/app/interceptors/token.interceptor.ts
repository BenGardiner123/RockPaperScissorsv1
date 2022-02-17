import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

  //   //check if getToekn returns null
  //   if(this.auth.getToken() != null){
  //     //add authorization header
  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.auth.getToken()}`
  //     }
  //   });
  //   console.log('requestJWT', request);
  //   return next.handle(request);

  // }
  //   //otherwise return the request
  //   return next.handle(request);
       // add auth header with jwt if user is logged in and request is to the api url
       const currentUser = this.auth.currentUserValue;
       const isLoggedIn = currentUser && currentUser.token;
       const isApiUrl = request.url.startsWith(environment.apiURL);
       const isIdentityUrl = request.url.startsWith(environment.authURL);
       if (isLoggedIn && isApiUrl || isLoggedIn && isIdentityUrl) {
           request = request.clone({
               setHeaders: {
                   Authorization: `Bearer ${currentUser.token}`
               }
           });
       }
 
       return next.handle(request);





  }
}
