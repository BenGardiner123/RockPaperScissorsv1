import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  //create a new httpresponse object to store the data;
  public data: HttpOutcome;

  //reuseable environemnt varible
  private apiURL = environment.apiURL + "Game";

  //create a behaviour subject to track the game state

  private gameDataSource = new BehaviorSubject<Game>({
    username: null,
    startDateTime: null,
    roundCounter: 0,
    roundLimit: 0,
    aiSelection: "",
    selection: "",
    outcome: ""
  });
  
  gameData = this.gameDataSource.asObservable();
 
  //  -------------------------------------------

  public isAuthenticated: boolean = false;

  constructor(private router: Router, 
    private httpClient: HttpClient, 
    private authService: AuthService) {

    console.log("game service constructor", this.gameDataSource.value);
    //this.userNameCheckOnLoad();
    
  }


  //if the authservice username has a value set the gameDataSource username to that
  userNameCheckOnLoad(){
    if(this.authService.currentUserValue.username != null){
      this.gameDataSource.value.username = this.authService.currentUserValue.username;
    }
  }


  loadUsername(newUserValue: string) {
    this.userNameCheckOnLoad(); 
    // if the username is null then set the username to the username passed in
    if (this.gameDataSource.value.username == null) {
    this.gameDataSource.value.username = newUserValue;
    }

  }

  //get starttime from the gameDataSource

  get startDateTime() {
    return this.gameDataSource.value.startDateTime;
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
    this.gameDataSource.value.roundCounter++;

  }

  startGame(roundLimit: number) {
    //create a new date object to store the current time
    let NewGameTime = new Date().toISOString();
    console.log("start game");
    let usercheck = this.username;
    console.log("username Check", usercheck);

    return this.httpClient.post(this.apiURL + "/StartGame", {
      //get the username from the authservice
      username : this.username,
      roundLimit: roundLimit,
      DateTimeStarted: NewGameTime,
      roundCounter: this.roundCounter
    }).subscribe({
      
      next: (response) => {
        console.log("this is the response", response)
        //naviate to the selection page
        this.router.navigate(['/selection']);
      },
      error: (error) => {
        error.status;
        console.log("this is the error", error);
      }
    });

  }


  commitSelection(option: "Rock" | "Paper" | "Scissors") {
    this.gameDataSource.value.selection = option;
    // this.gameDataSource.value.roundCounter++;
    let outgoingGame = {
      username: this.username,
      playerChoice: option,
      roundLimit: this.roundLimit,
      DateTimeStarted: this.startDateTime,
      roundCounter: this.roundCounter,

    };
    console.log("outgoing object", outgoingGame);
    let request = this.httpClient.post<Game>(this.apiURL + "/postSelection", outgoingGame);
    request.subscribe((response) => {
      //this stores the selection being pushed over from the compnent into the variable above
      console.log("this is whats coming back", response);
      this.gameDataSource.value.aiSelection = response.aiSelection;
      this.gameDataSource.value.outcome = response.outcome;
      this.gameDataSource.value.roundCounter++;
    }, (error) => {
      if (error.status == 401) {
        alert("Sorry - you are not authorized to do that")
      }
      if (error.status == 405) {
        alert("The method exists but not supported by the target - potentially incorrct formating")
      }
      if (error.status == 404) {
        alert("The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.")
      }
      if (error.status == 500) {
        alert("It is likely that some undetermined error occured.. internally. Have you tried switching it off and on again? ")
      }

    });

    //TODO neeed to do a roundcounter check here to see if the round is over
    //if it is over then need to navigate to the results page
    //if it is not over then need to navigate to the selection page

  }

  resetGame(){
    //clear the gamedataSource behaavior subject
    this.gameDataSource.next({
      username: this.authService.currentUserValue.username,
      startDateTime: null,
      roundCounter: 1,
      roundLimit: 0,
      aiSelection: "",
      selection: "",
      outcome: ""
    });

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
