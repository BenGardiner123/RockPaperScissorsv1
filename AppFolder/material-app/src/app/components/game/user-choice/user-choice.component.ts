import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameResultService } from 'src/app/services/game-result.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.scss']
})
export class UserChoiceComponent implements OnInit {

  public isSelected = false;
  public rockSelected: boolean;
  public paperSelected: boolean;
  public scissorsSelected: boolean;
  public roundCounter: number;
  public roundLimit: number;

  



  constructor(private gameService: GameService, private gameResultService: GameResultService, private router: Router) { }

  ngOnInit() {
    
    //subscribe to the gameData$ observable
    this.gameService.gameData$.subscribe(gameData => {
      this.roundCounter = gameData.roundCounter;
      this.roundLimit = gameData.roundLimit;
    });

    }



  chooseThis(option: "Rock" | "Paper" | "Scissors") {
    if (option == "Rock") {
      this.rockSelected = !this.rockSelected;
      // need to add the logic to turn off the other buttons here - currently i can select multiple choices.
      //disable other buttons
      this.paperSelected = false;
      this.scissorsSelected = false;
      this.disableButton();
    }
    else if (option == "Paper") {
      this.paperSelected = !this.paperSelected;
      //disable other buttons
      this.rockSelected = false;
      this.scissorsSelected = false;
      this.disableButton();
    }
    else if (option == "Scissors") {
      this.scissorsSelected = !this.scissorsSelected;
      //disable other buttons
      this.rockSelected = false;
      this.paperSelected = false;
      this.disableButton();
    }
  }

  makeSelection() {
    console.log("make selection");
    if (this.gameService.gameData$ == null) {
      alert("Please enter a username before making a selection");
      return;
    }
    else {
      if (this.rockSelected) {
        this.gameService.commitSelection("Rock")
        if (this.gameService.roundCheck()) {
          this.ngOnInit();
        }
        else {
          //navigate to the game result page
          this.gameResultService.getGameRoundResult();
          this.gameResultService.getGameWinner();
        }
       
      }
      else if (this.paperSelected) {
        this.gameService.commitSelection("Paper");
        if (this.gameService.roundCheck()) {
          this.ngOnInit();
        }
        else {
          //navigate to the game result page
          this.gameResultService.getGameRoundResult();
          this.gameResultService.getGameWinner();
        }
        
      }
      else if (this.scissorsSelected) {
        this.gameService.commitSelection("Scissors");
        if (this.gameService.roundCheck()) {
          this.ngOnInit();
        }
        else {
          //navigate to the game result page
          this.gameResultService.getGameRoundResult();
          this.gameResultService.getGameWinner();
        }
       

      }

    }
    //access the gameservice and increment the roundcounter - which should intheory update the 
    
    //call the roundCheck function to see if the round is over
    if (this.gameService.roundCheck()) {
      this.gameService.incrementCounter();
    }
    
    console.log("roundCounter from inside the userchoice component after calling incrementCounter",this.roundCounter);
  }

  clearSelection(){
    this.rockSelected = false;
    this.paperSelected = false;
    this.scissorsSelected = false;
    this.isSelected = false;
  }

  //disable the button until the user selects a round
  disableButton() {
    if (this.rockSelected || this.paperSelected || this.scissorsSelected) {
      this.isSelected = true;
    }
    else {
      this.isSelected = false;
    }
  }

}
