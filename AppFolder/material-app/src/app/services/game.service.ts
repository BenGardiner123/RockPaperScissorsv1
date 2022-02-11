import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Game, GameCheckResponseModel, GameCodeResponseModel } from '../models/game';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiURL = environment.apiURL + "Game";

  //create a behaviour subject to track the game state

  private gameDataSource$ = new BehaviorSubject<Game>({
    username: "",
    gameCode: "",
    startDateTime: null,
    roundLimit: 0,
    roundCounter: 0,
    aiSelection: "",
    outcome: "",
    selection: "",
  });

  gameData$: Observable<Game> = this.gameDataSource$.asObservable();

 
  //  -------------------------------------------

  public isAuthenticated: boolean = false;

  constructor(private router: Router, 
    private httpClient: HttpClient, 
    private authService: AuthService) {
  }

  incrementCounter() {
    this.gameDataSource$.next({
      ...this.gameDataSource$.value,
      roundCounter: this.gameDataSource$.value.roundCounter + 1
    });
  }

  



  loadUsername() {
    //check if the username in localstorage is null
    if (localStorage.getItem("username") != null) {
      let value = localStorage.getItem("username");
      this.gameDataSource$.value.username = value;
    }
    else
    {
      alert("You are not logged in");
    }


  }


  commitRoundSelection(roundNum: '1' | '3' | '5') {
    var specificNewGameTime = new Date();
    this.gameDataSource$.value.startDateTime = specificNewGameTime;
    this.gameDataSource$.value.roundLimit = parseInt(roundNum);
    this.gameDataSource$.value.roundCounter++;

  }

  startGame(roundLimit: number) {
    //create a new date object to store the current time
    let NewGameTime = new Date().toISOString();
    console.log("start game");
    let usercheck = this.gameDataSource$.value.username;
    console.log("username Check", usercheck);

    return this.httpClient.post<GameCheckResponseModel>(this.apiURL + "/StartGame", {
      //get the username from the authservice
      username : this.authService.currentUserValue.username,
      roundLimit: roundLimit,
      DateTimeStarted: NewGameTime,
      roundCounter: this.gameDataSource$.value.roundCounter
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

  //get game code from the server using get http with username and dateTimeStarted as params
  getGameCode() {
    let data = JSON.parse(localStorage.getItem('auth_data'));
    let username = data.username;
    let dateTimeStarted = this.gameDataSource$.value.startDateTime;
    return this.httpClient.post<GameCodeResponseModel>(this.apiURL + "/GameCode", { username, dateTimeStarted
    }).subscribe({
      next: (response) => {
        console.log("this is the response", response)
        this.gameDataSource$.value.gameCode = response.gameCode;
        //naviate to the selection page
        this.router.navigate(['/selection']);
      },
      error: (error) => {
        error.status;
        console.log("this is the error", error);
      }
    });
  }

  


  commitSelection(option: string) {
    
    let outgoingGame = {
      username: this.authService.getUsername(),
      playerChoice: option,
      roundLimit: this.gameDataSource$.value.roundLimit,  
      DateTimeStarted: this.gameDataSource$.value.startDateTime,
      roundCounter: this.gameDataSource$.value.roundCounter,
    };
    console.log("outgoing object", outgoingGame);
    let request = this.httpClient.post<Game>(this.apiURL + "/postSelection", outgoingGame);
    request.subscribe((response) => {
      //this stores the selection being pushed over from the compnent into the variable above
      console.log("this is whats coming back", response);
      this.gameDataSource$.value.aiSelection = response.aiSelection;
      this.gameDataSource$.value.outcome = response.outcome;
      
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
    let data = JSON.parse(localStorage.getItem("auth_data"));
    this.gameDataSource$.next({ 
      username: data.username,
      gameCode: "",
      startDateTime: null,
      roundLimit: 0,
      roundCounter: 0,
      aiSelection: "",
      outcome: "", 
      selection: "",
    });

  }


  public roundCheck() {
    if (this.gameDataSource$.value.roundCounter < this.gameDataSource$.value.roundLimit) {
      return true;
    }
    else {
      return false;
    }
  }


}
