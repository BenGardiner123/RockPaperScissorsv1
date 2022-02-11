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
  public gameCodeFound: boolean = false;


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

  //create a function that takes a selection from the front end and passes it to the game service

  makeSelection() {
    let selection: string;
    if (this.rockSelected) {
      selection = "Rock";
      this.gameService.commitSelection(selection);
      this.gameService.incrementCounter();
      if (this.roundCounter == this.roundLimit) {
        this.gameResultService.getGameWinner();

      }
    }
    else if (this.paperSelected) {
      selection = "Paper";
      this.gameService.commitSelection(selection);
      this.gameService.incrementCounter();
      if (this.roundCounter == this.roundLimit) {
        this.gameResultService.getGameWinner();
      }
    }
    else if (this.scissorsSelected) {
      selection = "Scissors";
      this.gameService.commitSelection(selection);
      this.gameService.incrementCounter();
      if (this.roundCounter == this.roundLimit) {
        this.gameResultService.getGameWinner();
      }

    }
    
   
    
    
  }

  clearSelection() {
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
