import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Game, GameResultRequestModel, GameResultResponseModel, GameWinnerResultResponseModel } from '../models/game';
import { serverResponse } from '../models/serverResonse';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  getCurrentGame: Game;

  constructor(private router: Router, private httpClient: HttpClient, private gameService: GameService) { 
    //map get game to the GameDAtaSource$
    this.gameService.gameData$.subscribe(game => {
      this.getCurrentGame = game;
    }
    );
  }

  private apiURL = environment.apiURL + "Game";

  public results: GameResultResponseModel;
  public gameWinner: GameWinnerResultResponseModel;

// change to post request
  getGameRoundResult(){
    let data = JSON.parse(localStorage.getItem('auth_data'));
    return this.httpClient.post<GameResultResponseModel>(this.apiURL + "/GameResult",
    {
      username: data.username,
      dateTimeStarted: this.getCurrentGame.startDateTime,
    }).subscribe({
      next: (response) => {
        this.results = response
        console.log(this.results);
      }
    });  
 }

  getGameWinner(){
    let data = JSON.parse(localStorage.getItem('auth_data'));
    return this.httpClient.post<string>(this.apiURL + "/GameWinner", { 
      dateTimeStarted: this.getCurrentGame.startDateTime,
      username: data.username
    }
    ).subscribe({
      next: (response) => {
        response = this.gameWinner.GameWinner;
        console.log(response);
        //navigate to the game result page
        this.router.navigate(['/results']);
      }
  
    });
  }

}
