import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router, private gameService: GameService) { }
  
  ngOnInit() {
  
  
  }

  //TODO this validator below needs to allow special characters, at the moment its enforcing one which
  //isnt what i wanted

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), 
      //add validator pattern 1 capital letter and 1 number and no special characters
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    
  });

  onLoginSubmit() {
    //get the form values
    const formValues = this.loginForm.value;

   this.auth.login(formValues.username, formValues.password).subscribe({
      next: (data) => {
        // //send the username to the auth service
        // this.gameService.loadUsername(formValues.username);
        // console.log(data);
        if (data.token !== null) {
          this.router.navigate(['/rounds']);
        }
      }
   }
  ), (err) => {
     throw err;
  }}

}
