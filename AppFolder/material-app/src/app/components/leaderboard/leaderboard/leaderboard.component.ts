import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Leaderboard, LeaderboardEnvelope } from 'src/app/models/leaderboard';
import { LeaderboardService } from 'src/app/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

 
  //instantita leaders of type leadeboard evnevelope
  leaders: LeaderboardEnvelope;  
 

  public dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'gamesPlayed', 'gamesWon', 'gamesLost', 'gamesTied', 'winPercentage', 'mostUsedChoice'];



 

  constructor(private leaderboardService: LeaderboardService) {
    
  }

  ngOnInit(){ 
    this.leaderboardService.getLeaderboard().subscribe((data) => {
    console.log(data);
    this.leaders = data;
    //select the winpercentage column and allow only 2 decimal places
    this.leaders.leaders.forEach(leader => {
      //convert the winpercentage to a string
      let winPercentageString = leader.winPercentage.toString();
      winPercentageString = leader.winPercentage.toFixed(2);
      leader.winPercentage = parseFloat(winPercentageString);
    });
    this.dataSource = new MatTableDataSource(this.leaders.leaders);

  });
   
  }


  



}
