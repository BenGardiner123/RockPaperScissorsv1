import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Game, GameCheckRequestModel } from '../models/game';
import { HttpOutcome } from '../models/httpOutcome';
import { serverResponse } from '../models/serverResonse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  //reuseable environemnt varible
  private apiURL = environment.apiURL + "Game";

  //create a behaviour subject to track the game state

  private gameDataSource = new BehaviorSubject<Game>({"username": null, "startDateTime": null, "roundCounter": 1, "roundLimit": 0, "aiSelection": "", "selection": "", "outcome": ""});

  gameData$ = this.gameDataSource.asObservable();

  //  -------------------------------------------

  public isAuthenticated: boolean = false;

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) { 
    this.loadUsername();
    console.log("game service constructor", this.gameDataSource.value);
  }


  loadUsername() {
    this.gameDataSource.value.username = this.authService.getUsername();
  }

  //get starttime from the gameDataSource

  get startDateTime() {
    return this.gameData$;
  }

  get roundLimit() {
    return this.gameDataSource.value.roundLimit;
  }

  get roundCounter() {
    return this.gameDataSource.value.roundCounter;
  }

  get aiSelection() {
    return this.gameDataSource.value.aiSelection;
  }

  get username() {
    return this.gameDataSource.value.username;
  }

  commitRoundSelection(roundNum: '1' | '3' | '5') {
    var specificNewGameTime = new Date();
    this.gameDataSource.value.startDateTime = specificNewGameTime;
    this.gameDataSource.value.roundLimit = parseInt(roundNum);
    // this.gameDataSource.value.roundCounter = 0;

  }

  startGame(){
    console.log("start game");
    return this.httpClient.post<HttpOutcome>(this.apiURL + "/StartGame",
    {
      // this sends all the information neeed to start the game
      username: this.username, 
      roundLimit: this.roundLimit, 
      DateTimeStarted: this.startDateTime, 
      currentRound: this.roundCounter
    }).subscribe((response) => {
      if(response.status == 200){
        console.log("game started");  
      }
      if(response.status == 401 || response.status == 403){
        console.log("game not started");
      }
    }, (error) => {
      if(error.status == 401){
      alert("Sorry - you are not authorized to do that")
      }
      if(error.status == 405){
      alert("The method exists but not supported by the target - potentially incorrct formating")
      }
      if(error.status == 500){
      alert("Server Error")
      }
    });
  }


  commitSelection(option: "Rock" | "Paper" | "Scissors") {
        this.gameDataSource.value.selection = option;
        this.gameDataSource.value.roundCounter++;
        let request = this.httpClient.post<Game>(this.apiURL + "/postSelection",
        {
          username: this.username, 
          playerChoice: option,
          roundLimit: this.roundLimit, 
          roundCounter: this.roundCounter,
          DateTimeStarted: this.startDateTime
        });
        //console log the request object

        console.log("comit selection request", request);
        request.subscribe((response) => {
        //this stores the selection being pushed over from the compnent into the variable above
        console.log(response);
        this.gameDataSource.value.aiSelection = response.aiSelection;
        this.gameDataSource.value.outcome = response.outcome;

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

      //TODO neeed to do a roundcounter check here to see if the round is over
      //if it is over then need to navigate to the results page
      //if it is not over then need to navigate to the selection page

      if (this.roundCheck()) {
        this.router.navigateByUrl("/selection");
        //incremnt tghe round counter and take them back to the selction page, if the counter reaches the end then we go to the results page
        this.gameDataSource.value.roundCounter++;
      }
      else{
       /// TODO need to create a results page for this
        this.router.navigateByUrl("/results");
      }


  }

  // change to post request
  getGameResult() {
    //   let request = this.httpClient.post<serverResponse[]>(this.apiURL,
    //   {
    //     Username: this.rockPaperScissors.username,
    //     dateTimeStarted: this.rockPaperScissors.startDateTime,
    //   });
    //   request.subscribe((response) => {
    //   //this stores the selection being pushed over from the compnent into the variable above
    //   this.results = response;
    //   this.router.navigateByUrl("/Result");
    //   }, (error) => {
    //         if(error.status == 401){
    //           alert("Sorry - you are not authorized to do that")
    //         }
    //         if(error.status == 405){
    //           alert("The method exists but not supported by the target - potentially incorrct formating")
    //         }
    //         if(error.status == 404){
    //           alert("The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.")
    //         }
    //         if(error.status == 500){
    //           alert("It is likely that some undetermined error occured.. internally. Have you tried switching it off and on again? ")
    //         }

    // });

  }


  public roundCheck() {
    if (this.gameDataSource.value.roundCounter < this.gameDataSource.value.roundLimit) {
      return true;
    }
    else {
      return false;
    }
  }


}
