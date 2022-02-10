import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResultService } from 'src/app/services/game-result.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  public gameResult: string;

  constructor(private gameResultService: GameResultService, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameResult = this.gameResultService.gameOutcome;
  }
  
  //get the value from game result
  getResultString(){
    if(this.gameResult === 'Player One'){
      return 'You Win';
    }
    else if(this.gameResult === 'Player Two'){
      return 'You Lose';
    }
    else{
      return 'Draw';
    }
  }
  

  reset(){
    this.gameService.resetGame();
    //send me back to the round selection
    //console log the 
    this.router.navigate(['/rounds']);
  }

  




}
