import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { DisplayResultComponent } from './components/game/display-result/display-result.component';
import { RoundSelectionComponent } from './components/game/round-selection/round-selection.component';
import { UserChoiceComponent } from './components/game/user-choice/user-choice.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard/leaderboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GameResultService } from './services/game-result.service';

const routes: Routes = [
  {path: "selection", component: UserChoiceComponent,  canActivate: [AuthGuard]},
  {path: "results", component: DisplayResultComponent,  canActivate: [AuthGuard]},
  {path: "leaderboard", component: LeaderboardComponent, },
  {path: "rounds", component: RoundSelectionComponent,  canActivate: [AuthGuard]},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
    
  {path: "**", redirectTo: "login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



