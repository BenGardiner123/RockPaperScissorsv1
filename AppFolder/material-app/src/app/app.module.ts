import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { MaterialModule } from './material/material.module';
import { RoundSelectionComponent } from './components/game/round-selection/round-selection.component';
import { DisplayResultComponent } from './components/game/display-result/display-result.component';
import { UserChoiceComponent } from './components/game/user-choice/user-choice.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard/leaderboard.component';
import { GameContainerComponent } from './components/game/game-container/game-container.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RoundSelectionComponent,
    DisplayResultComponent,
    UserChoiceComponent,
    LeaderboardComponent,
    GameContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
