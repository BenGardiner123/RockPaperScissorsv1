import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    ///this is going to have to come from
    this.gameService.gameData$.subscribe(data => {
      this.roundLimit = data.roundLimit;
      this.roundCounter = data.roundCounter;
    });
    console.log(this.roundCounter);
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
          /// TODO need to create a results page for this
          this.router.navigateByUrl("/results");
        }  
      }
      else if (this.paperSelected) {
        this.gameService.commitSelection("Paper");
        if (this.gameService.roundCheck()) {
          this.ngOnInit();
        }
        else {     
          this.router.navigateByUrl("/results");
        }
      }
      else if (this.scissorsSelected) {
        this.gameService.commitSelection("Scissors");
        if (this.gameService.roundCheck()) {
          this.ngOnInit();
        }
        else {
          this.router.navigateByUrl("/results");
        }

      }

    }
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
