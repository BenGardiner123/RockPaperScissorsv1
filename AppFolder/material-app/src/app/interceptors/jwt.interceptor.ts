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
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add auth header with jwt if user is logged in and request is to the api url
      const currentUser = this.authService.currentUserValue;
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
