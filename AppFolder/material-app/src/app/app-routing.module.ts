import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DisplayResultComponent } from './components/game/display-result/display-result.component';
import { RoundSelectionComponent } from './components/game/round-selection/round-selection.component';
import { UserChoiceComponent } from './components/game/user-choice/user-choice.component';
import { GameResultService } from './services/game-result.service';

const routes: Routes = [
  {path: "selection", component: UserChoiceComponent},
  {path: "results", component: DisplayResultComponent},
  // {path: "Leaderboard", component: RpsLeaderboardComponent},
  {path: "rounds", component: RoundSelectionComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
    
  {path: "**", redirectTo: "roundSelection"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



