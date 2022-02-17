import { Injectable } from '@angular/core';
import { LoginUserRequestModel, LoginUserResponseModel, RegisterUserRequestModel, RegisterUserResponseModel, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject =  new BehaviorSubject<User>(null);
  currentUser$: Observable<User> = this.currentUserSubject.asObservable();
  
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;


  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.currentUserSubject.pipe(map(user => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    const userAuthData = localStorage.getItem(AUTH_DATA);

    if (userAuthData) {
      this.currentUserSubject.next(JSON.parse(userAuthData));
    }

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  //get user token from local storage
  getToken() {
    return this.currentUserValue ? this.currentUserValue.token : null;
  }
  

  register(username: string, email: string, password: string) {
    return this.http.post<RegisterUserResponseModel>(`${environment.authURL}Authenticate/register`, { username, email, password }) ;
  }


  login(username: string, password: string) {
    return this.http.post<LoginUserResponseModel>(`${environment.authURL}Authenticate/login`, { username, password })
      .pipe(
        tap(user => {
            this.currentUserSubject.next(user);
            localStorage.setItem(AUTH_DATA, JSON.stringify(user));
        }),
        shareReplay()
    ); 
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem(AUTH_DATA);
  }

  getUsername() {
    let data = JSON.parse(localStorage.getItem('auth_data'));
    return data.username; 
  }


}
