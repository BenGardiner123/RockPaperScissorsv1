import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game, GameIdResultRequestModel, GameResultResponseModel} from '../models/game';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  getCurrentGame: Game;
  isGameWinnerCalculated: string;


  constructor(private router: Router, private httpClient: HttpClient, private gameService: GameService) {
    //map get game to the GameDAtaSource$
    this.gameService.gameData$.subscribe(game => {
      this.getCurrentGame = game;
    }
    );
  }

  private apiURL = environment.apiURL + "Game";

  
  public results: GameResultResponseModel;


 //post method to calualte game result
  postGameCalc() {
    let data = this.getCurrentGame.gameCode;
    return this.httpClient.post<string>(this.apiURL + "/GameId",
      {
        gameCode: data
      }).subscribe({
        next: (response) => {
          this.isGameWinnerCalculated = response
          console.log(this.results);
        },
        error: (error) => {
          console.log("gameidhttp", error);
        }
      });
  }

  

  getGameId() {
    let data = JSON.parse(localStorage.getItem('auth_data'));
    return this.httpClient.post<GameResultResponseModel>(this.apiURL + "/GameId",
      {
        username: data.username,
        dateTimeStarted: this.getCurrentGame.startDateTime,
      }).subscribe({
        next: (response) => {
          this.results = response
          console.log(this.results);
        },
        error: (error) => {
          console.log("gameidhttp", error);
        }
      });
  }

  getGameWinner(){
    let data = JSON.parse(localStorage.getItem('auth_data'));
    let gameCode = this.getCurrentGame.gameCode;
    return this.httpClient.post<GameResultResponseModel>(this.apiURL + "/GameWinner", { 
      gameCode
    }
    ).subscribe({
      next: (response) => {
        response = this.results;
        console.log(response);
        //navigate to the game result page
        this.router.navigate(['/results']);
      }

    });
  }

}
