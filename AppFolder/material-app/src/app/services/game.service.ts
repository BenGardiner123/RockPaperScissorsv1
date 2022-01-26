import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

   //reuseable environemnt varible
   private apiURL = environment.apiURL + "Game";

   //create a behaviour subject to track the game state

   private gameDataSource = new BehaviorSubject<Game>(null);

   gameData$ = this.gameDataSource.asObservable();

  //  -------------------------------------------

   public isAuthenticated: boolean = false;
 
   private _StartDateTime: Date;
   private _roundCounter: number | null;
   private _roundLimit: number | null;
   private  _username: string | null;
   private _AiSelection: string | null;
   private _selection: string | null;
   private _outcome: string | null;

  
   get username(){
     return this.;
   }
  
   get startDateTime(){
     return this._StartDateTime;
   }
 
   get roundCounter(){
     return this._roundCounter;
   }
   
   get roundLimit(){
     return this._roundLimit;
   }
 
   get aiselection(){
     return this._AiSelection;
   }
 
   get selection(){
     return this._selection;
   }
 
   get outcome(){
     return this._outcome;
   }
 

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService) { }


  getUsername(){
   this.gameDataSource.value.username = this.authService.getUsername();
  }

  commitRoundSelection(roundNum: '1' | '3' | '5'){
    var specificNewGameTime = new Date();
    //set the username
    this.getUsername();
    this.gameDataSource.value.startDateTime = specificNewGameTime;
    this.gameDataSource.value.roundLimit = parseInt(roundNum);
    this.gameDataSource.value.roundCounter = 0;

  }

  startGame(){
    console.log("start game");
    // //console.log("playersName", this.playerService.getUsername());

    // let request = this.httpClient.post<GameCheckRequestModel>(this.apiURL + "/StartGame",
    // {
    //   // this sends all the information neeed to start the game
    //   username: this.playerService.getUsername(), 
    //   roundLimit: this.roundLimit, 
    //   DateTimeStarted: this.startDateTime, 
    //   currentRound: this.roundCounter
    // });
    // request.subscribe((response) => {
    //   //console loggin below to see what gets sent for my own understanding
    //   //i
    //   console.log(response);
    //   this.username = response.username
    //   this._roundLimit = response.roundLimit
    //   this._roundCounter = response.currentRound
    //   // this._StartDateTime = response.DateTimeStarted
    //   this.router.navigateByUrl("/Selection");
      
  
    // });
  }


 commitSelection(option: "Rock" | "Paper" | "Scissors"){
//     this._roundCounter++;
//     let request = this.httpClient.post<serverResponse>(this.apiURL + "/CommitSelection",
//     {
//       username: this.username, 
//       playerChoice: option,
//       roundLimit: this.roundLimit, 
//       roundCounter: this.roundCounter,
//       DateTimeStarted: this.startDateTime
//     });
//     request.subscribe((response) => {
//     //this stores the selection being pushed over from the compnent into the variable above
//     console.log(response);
//     this.username = response.username;
//     this._StartDateTime = response.dateTimeStarted;
  
//     }, (error) => {
//           if(error.status == 401){
//             alert("Sorry - you are not authorized to do that")
//           }
//           if(error.status == 405){
//             alert("The method exists but not supported by the target - potentially incorrct formating")
//           }
//           if(error.status == 404){
//             alert("The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.")
//           }
//           if(error.status == 500){
//             alert("It is likely that some undetermined error occured.. internally. Have you tried switching it off and on again? ")
//           }

//   });

//   //TODO neeed to do a roundcounter check here to see if the round is over
//   //if it is over then need to navigate to the results page
//   //if it is not over then need to navigate to the selection page

//   if (this.roundCheck()) {
//     this.router.navigateByUrl("/Selection");
//   }
//   else{
//    /// TODO need to create a results page for this
//     this.router.navigateByUrl("/Results");
//   }


 } 

 // change to post request
 getGameResult(){
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

  
 public roundCheck(){
   if (this.roundCounter < this.roundLimit){
     return true;
   }
    else{
      return false;
    }
  }


}
