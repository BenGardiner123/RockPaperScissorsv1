import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterUsernameResponseModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  listOfPlayers: string[] = [];

  constructor(private http: HttpClient) { }

  checkUserNameNotTaken() {
    return this.http.get(`${environment.apiURL}Player`).subscribe(data => {
      this.listOfPlayers = data as string[];
    });
  }

 //check if the username is available
  checkUsername(username: string) {
    return this.http.post<RegisterUsernameResponseModel>(`${environment.authURL}UsernameCheck`, { username });
  }


  postNewPlayer(username: string) {
    return this.http.post<RegisterUsernameResponseModel>(`${environment.apiURL}Player`, {username} );
  }

}
