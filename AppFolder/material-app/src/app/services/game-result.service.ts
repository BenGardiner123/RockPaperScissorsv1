import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GameResultResponseModel } from '../models/game';
import { serverResponse } from '../models/serverResonse';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  constructor(private router: Router, private httpClient: HttpClient, private gameService: GameService) { 
    
  }

  private apiURL = environment.apiURL + "Game";

  public gameOutcome: string | null;

  public results: GameResultResponseModel;
  

// change to post request
  getGameResult(){
  
    let request = this.httpClient.post<GameResultResponseModel>(this.apiURL + "/GameResult",
    {
      username: this.gameService.username, 
      dateTimeStarted: this.gameService.startDateTime,
    });
    request.subscribe((response) => {
    //this stores the selection being pushed over from the compnent into the variable above
    console.log("what is the response, is game winner there?" , response);
    this.results = response;
    //set the winner in the behavior subject
    this.gameOutcome = this.results.gameWinner;
    console.log(this.results);
    this.router.navigateByUrl("/results");
    }, (error) => {
          if(error.status == 401){
            alert("Sorry - you are not authorized to do that")
          }
          if(error.status == 405){
            alert("The method exists but not supported by the target - potentially incorrct formating")
          }
          if(error.status == 404){
            alert("The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.")
          }
          if(error.status == 500){
            alert("It is likely that some undetermined error occured.. internally. Have you tried switching it off and on again? ")
          }

  });

 }
}
