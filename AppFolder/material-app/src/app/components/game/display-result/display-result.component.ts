import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, forkJoin } from 'rxjs';
import { Game, GameResultResponseModel, GameWinnerResponseModel } from 'src/app/models/game';
import { GameResultService } from 'src/app/services/game-result.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  gameResult: GameResultResponseModel;
  gameWinner: GameWinnerResponseModel;
  //private currentGame: Game;
  isLoading: boolean = true;

  public winner: boolean;
  public loser: boolean;
  public draw: boolean;

  constructor(public gameResultService: GameResultService, private router: Router, private gameService: GameService) {
    this.gameResultService = gameResultService;
  }

  ngOnInit(){
   
    //create a forkjoin using rxJs for postgameCalc and getgamewinner
    console.log("in display result", this.isLoading);
   
    this.getGameWinner();
    this.getRounds();
    
    
    this.isLoading = false;
    console.log("in display result", this.isLoading);
    console.log("in display result 2", this.gameResult);
    console.log("in display result 3", this.gameWinner);
  }

  //create a method to call postGameCalc and getGameWinner
 getGameWinner() {
  
  this.gameResultService.postGameCalc().subscribe({
    next: (gameWinnerData) => {
      this.gameWinner = gameWinnerData;
      console.log("game winner 1st", this.gameWinner);
      console.log("game winner 1st inside the object", this.gameWinner.gameWinner);
      console.log("game winner whats coming back", gameWinnerData);
      this.getResultString();
    },
    error: (error) => {
      console.log("gameidhttp", error);
    }
  })
 }

 getRounds() {
   console.log("in get rounds");
  this.gameResultService.getGameWinnerRounds().subscribe({
    next: (gameResultData) => {
      this.gameResult = gameResultData;
      console.log("game result", this.gameResult);
      console.log("game result rounds", this.gameResult.rounds);
      console.log("game result data", gameResultData);
    }
  });
  console.log("in display result 1", this.isLoading);
 }


  //get the value from game result
  getResultString() {
    if (this.gameWinner.gameWinner == 'Player One') {
      this.winner = true;
      this.loser = false;
      this.draw = false;
      return this.winner;
    }
    else if (this.gameWinner.gameWinner == 'Player Two') {
      this.loser = true;
      this.winner = false;
      this.draw = false;
      return this.loser;
    }
    else if (this.gameWinner.gameWinner == 'Draw') {
      this.winner = false;
      this.loser = false;
      this.draw = true;
      return this.draw;
    }
    else
      return null;
  }


  


  reset() {
    this.gameService.resetGame();
    this.router.navigate(['/rounds']);
  }






}
