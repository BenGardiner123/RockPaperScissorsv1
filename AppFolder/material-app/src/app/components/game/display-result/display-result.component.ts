import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResultResponseModel } from 'src/app/models/game';
import { GameResultService } from 'src/app/services/game-result.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  public gameResult: GameResultResponseModel;


  public winner: boolean;
  public loser: boolean;
  public draw: boolean;

  constructor(private gameResultService: GameResultService, private router: Router, private gameService: GameService) {
  
  }
   
  ngOnInit(): void {
    this.gameResult = this.gameResultService.results;
    
    this.getResultString();
  }

  //get the value from game result
  getResultString(){
    if(this.gameResult.winner == 'Player One'){
      this.winner = true;
      this.loser = false;
      this.draw = false;
      return this.winner;
    }
    else if(this.gameResult.winner == 'Player Two'){
      this.loser = true;
      this.winner = false;
      this.draw = false;
      return this.loser;
    }
    else{
      this.winner = false;
      this.loser = false;
      this.draw = true;
      return this.draw;
    }
  }
  

  reset(){
    this.gameService.resetGame();
    this.router.navigate(['/rounds']);
  }

  




}
