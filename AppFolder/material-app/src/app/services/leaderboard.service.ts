import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Leaderboard, LeaderboardEnvelope } from '../models/leaderboard';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  //acceess the environemtn variable to get the url
  private apiURL = environment.apiURL + "Leaderboard";

  constructor(private http: HttpClient) { }

  getLeaderboard(): Observable<LeaderboardEnvelope> {
    return this.http.get<LeaderboardEnvelope>(this.apiURL + "/Leaderboard");
  }

}
