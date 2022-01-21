import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Routes = [
  // {path: "Selection", component: RpsSelectionComponent},
  // {path: "Result", component: RpsDisplayResultComponent},
  // {path: "Leaderboard", component: RpsLeaderboardComponent},
  // {path: "Rounds", component: RoundSelectionComponent},
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
    
  {path: "**", redirectTo: "signup"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



