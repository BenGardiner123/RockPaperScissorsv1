import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-round-selection',
  templateUrl: './round-selection.component.html',
  styleUrls: ['./round-selection.component.scss']
})
export class RoundSelectionComponent implements OnInit {

  public isSelected = false;

  public oneSelected: boolean;
  public threeSelected: boolean;
  public fiveSelected: boolean;
 

  constructor(public router: Router, private gameService: GameService) {
    this.oneSelected = false;
    this.threeSelected = false;
    this.fiveSelected = false;
   }

  ngOnInit(): void {
  }


  chooseThisRound(option: '1'|'3'|'5'){
    if (option == '1'){
      this.oneSelected = !this.oneSelected;
      this.threeSelected = false;
      this.fiveSelected = false;
    }
    else if(option == '3')
    {
      this.threeSelected = !this.threeSelected;
      this.oneSelected = false;
      this.fiveSelected = false;
    }
    else if(option == '5')
    {
      this.oneSelected = false;
      this.threeSelected = false;
      this.fiveSelected = !this.fiveSelected;
    }

  }

  makeRoundSelection(){
    
   
    if (this.oneSelected){
      this.gameService.commitRoundSelection('1');
    }
    else if(this.threeSelected){
      this.gameService.commitRoundSelection('3');
    }
    else if(this.fiveSelected){
      this.gameService.commitRoundSelection('5');
    }
    
    this.router.navigateByUrl("/Selection");

}

//disable the button until the user selects a round
disableButton(){
  if(this.oneSelected || this.threeSelected || this.fiveSelected){
    this.isSelected = true;
  }
  else{
    this.isSelected = false;
  }
}

}
