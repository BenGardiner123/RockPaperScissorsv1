import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor() {

   }
  

  ngOnInit() {
   
  }

  //TODO this validator below needs to allow special characters, at the moment its enforcing one which
  //isnt what i wanted

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), 
      //add validator pattern 1 capital letter and 1 number and no special characters
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    
  });

  onLoginSubmit() {
    console.log(this.loginForm);
  }
}
