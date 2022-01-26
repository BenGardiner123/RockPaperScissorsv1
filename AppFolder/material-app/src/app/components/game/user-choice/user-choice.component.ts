import { Component, OnInit } from '@angular/core';
import { GameResultService } from 'src/app/services/game-result.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.scss']
})
export class UserChoiceComponent implements OnInit {

  
 public rockSelected: boolean;
 public paperSelected: boolean;
 public scissorsSelected: boolean;
 public roundCounter: number;
 public roundLimit: number;

  constructor(private gameService: GameService, private gameResultService: GameResultService) { }

  ngOnInit(): void {
    this.roundLimit = this.gameService.roundLimit;
    this.roundCounter = this.gameService.roundCounter;
  }

  chooseThis(option: "Rock" | "Paper" | "Scissors"){
    if (option == "Rock"){
      this.rockSelected = !this.rockSelected;
      // need to add the logic to turn off the other buttons here - currently i can select multiple choices.
      //disable other buttons
  
    }
    else if(option == "Paper")
    {
      this.paperSelected = !this.paperSelected;
    }
    else if(option == "Scissors")
    {
      this.scissorsSelected = !this.scissorsSelected;
    }
  }

  makeSelection(){
    if(this.gameService.username == null)
    {
      alert("Please enter a username before making a selection");
      return;
    }
    else{
      if (this.rockSelected){
        this.gameService.commitSelection("Rock");
        if(this.gameService.roundCounter == this.gameService.roundLimit){
          this.gameResultService.getGameResult();
        }
        // this.roundCounter++;
      }
      else if(this.paperSelected){
        this.gameService.commitSelection("Paper");
        if(this.gameService.roundCounter == this.gameService.roundLimit){
          this.gameResultService.getGameResult();
        }
        // this.roundCounter++;
      }
      else if(this.scissorsSelected){
        this.gameService.commitSelection("Scissors");
        if(this.gameService.roundCounter == this.gameService.roundLimit){
          this.gameResultService.getGameResult();
        }
        // this.roundCounter++;
    }
  
  }
}

}
