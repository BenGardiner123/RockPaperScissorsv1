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
 
  

  reset(){
    this.gameService.resetGame();
  }

  




}
