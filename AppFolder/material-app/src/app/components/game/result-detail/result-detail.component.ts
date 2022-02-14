import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameResultResponseModel, GameResultResponseModel_Round } from 'src/app/models/game';
import { GameResultService } from 'src/app/services/game-result.service';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {

  @Input()
  results: GameResultResponseModel_Round;

  public aiBackground: string = "";
  public userBackground: string = "";

  constructor(private gameResultService: GameResultService , private router: Router, private httpClient: HttpClient) { 
    // need to implement the function here that makes the call to the webapi so on load it gets the info
    // this.rockPaperScissorsService = rockPaperScissorsService;
  
  }

  ngOnInit(): void {
    this.aiBackgroundSetter();
    this.userBackgroundSetter();
  }

  // showSingleRound(){
  //   this.gameResultService.getGameResult();
  // }

  aiBackgroundSetter(){
    if (this.results.PlayerTwoChoice == "Rock")
    {
      this.aiBackground = "https://i.ibb.co/VqKy2hT/rock.png";
    }
    if (this.results.PlayerTwoChoice == "Paper")
    {
      this.aiBackground = "https://i.ibb.co/zXMN3xJ/paper.png";
    }
    else if (this.results.PlayerTwoChoice == "Scissors")
    {
      this.aiBackground = "https://i.ibb.co/BPxfRJD/scissors1.png";
    }
  }

    userBackgroundSetter(){
      if (this.results.PlayerOneChoice == "Rock")
    {
      this.userBackground = "https://i.ibb.co/VqKy2hT/rock.png";
    }
    if (this.results.PlayerOneChoice == "Paper")
    {
      this.userBackground = "https://i.ibb.co/zXMN3xJ/paper.png";
    }
    else if (this.results.PlayerOneChoice == "Scissors")
    {
      this.userBackground = "https://i.ibb.co/BPxfRJD/scissors1.png";
    }
    
  }
}
