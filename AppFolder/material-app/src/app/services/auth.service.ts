import { Injectable } from '@angular/core';
import { LoginUserRequestModel, LoginUserResponseModel, RegisterUserRequestModel, RegisterUserResponseModel, User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private _username: string = "Ben";

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(newUser: RegisterUserRequestModel) {
    return this.http.post<RegisterUserResponseModel>(`${environment.authURL}/Authenticate/register`, { newUser });
  }


  login(userLogin: LoginUserRequestModel) {
    return this.http.post<LoginUserResponseModel>(`${environment.authURL}/Authenticate/login`, { userLogin })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUsername() {
    return this._username;
  }


}
