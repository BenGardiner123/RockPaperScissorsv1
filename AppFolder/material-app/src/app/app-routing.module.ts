import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { RoundSelectionComponent } from './components/game/round-selection/round-selection.component';
import { UserChoiceComponent } from './components/game/user-choice/user-choice.component';

const routes: Routes = [
  {path: "selection", component: UserChoiceComponent},
  // {path: "Result", component: RpsDisplayResultComponent},
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



