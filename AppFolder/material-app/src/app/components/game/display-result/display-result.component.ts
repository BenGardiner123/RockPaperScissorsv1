import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResultService } from 'src/app/services/game-result.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.scss']
})
export class DisplayResultComponent implements OnInit {

  public gameResult: string;

  constructor(private gameResultService: GameResultService, private router: Router) { }

  ngOnInit(): void {
    this.showGameResult();
    this.gameResultService.getWinner();
    this.gameResultService.calulateWinner();
    this.gameResult = this.gameResultService.gameOutcome;
  }
  showGameResult(){
    this.gameResultService.getGameResult();
  }




}
