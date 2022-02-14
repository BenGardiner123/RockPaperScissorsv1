import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameCodeResponseModel, GameIdResultRequestModel, GameResultResponseModel, GameWinnerResponseModel} from '../models/game';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  public gameCode: string;
  public gameCodeResponse: GameCodeResponseModel;
  public gameRoundsFinal: GameResultResponseModel;
  public winnerResponse: GameWinnerResponseModel;

  // ------------------------------------------- //

  constructor(private router: Router, private httpClient: HttpClient, private gameService: GameService) {
    
  }

  private apiURL = environment.apiURL + "Game";

  

 //post method to calualte game result
  postGameCalc() {
    let data = {
     gameCode: this.gameService.userGameCode.toString()
    }
    return this.httpClient.post<GameWinnerResponseModel>(this.apiURL + "/CalculateWinner", data);
     
  }


  getGameWinnerRounds() {
    let data = {
      gameCode: this.gameService.userGameCode.toString()
     }
    return this.httpClient.post<GameResultResponseModel>(this.apiURL + "/GameResult", data );  
  }

}
