import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string = "test";

  constructor() { }

  getUsername(){
    return this._username;
  }

}
