import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { serverResponse } from '../models/serverResonse';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class GameResultService {

  constructor(private router: Router, private httpClient: HttpClient, private gameService: GameService) { 
    
  }

  private apiURL = environment.apiURL + "GameResult";
  

  // game outcome will tally the results from all the rounds and decide if you won
  // public gameOutcomeResults: [];
  public gameOutcome: string | null;
  public results: serverResponse[];
  public wincounter: number = 0;
  public loseCounter: number = 0;
  public drawCounter: number = 0;



getWinner(){
  // looping through each line in the object and pushing the counter
  for (var index in this.results) {
    // console.log("xxxxx");
    // console.log(this.results[index].outcome);
      if(this.results[index].outcome == "W"){
        this.wincounter++;
        console.log("Win");
      }
      else if (this.results[index].outcome == "L"){
        this.loseCounter++;
        console.log("Lose");
      }
      else if (this.results[index].outcome == "D"){
        this.drawCounter++;
        console.log("Draw");
      }
    }
    console.log(this.wincounter + " ;" + this.drawCounter + " ;" + this.drawCounter );
  };

  calulateWinner(){
  // testing the counters to produce a winnner
   if(this.wincounter > this.loseCounter || this.wincounter > this.drawCounter){
     this.gameOutcome = "Win"
      console.log(this.gameOutcome);
    } 
   else if (this.loseCounter > this.wincounter || this.loseCounter > this.drawCounter ){
     this.gameOutcome = "Lose"
     console.log(this.gameOutcome);
    }
   else if(this.drawCounter >= this.wincounter || this.drawCounter >= this.loseCounter){
     this.gameOutcome = "Draw"
     console.log(this.gameOutcome);
    }
  }

   
    

// change to post request
  getGameResult(){
    let request = this.httpClient.post<serverResponse[]>(this.apiURL,
    {
      Username: this.gameService.username,
      dateTimeStarted: this.gameService.startDateTime,
    });
    request.subscribe((response) => {
    //this stores the selection being pushed over from the compnent into the variable above
    this.results = response;
    this.router.navigateByUrl("/Result");
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
