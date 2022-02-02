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
    this.getGameResult();
    this.gameResult = this.gameResultService.results.GameWinner;
  }
  getGameResult(){
    this.gameResultService.getGameResult();
  }

  




}
