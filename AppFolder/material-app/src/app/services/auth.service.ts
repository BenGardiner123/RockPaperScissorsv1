import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string = "Benson";

  constructor() { }

  getUsername(){
    return this._username;
  }


  logout(){
    this._username = "";
    //clear the session and local Storage
    sessionStorage.clear();
    localStorage.clear();
    

  }
}
