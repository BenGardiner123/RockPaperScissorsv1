import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequestModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isRegistered: boolean = false;

  constructor(
     private authService: AuthService,
     private router: Router,

  ) { }
  

  ngOnInit() {

  }

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), 
      //add validator pattern 1 capital letter and 1 number and no special characters
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    
  });


  onSignupSubmit() {

    //get the form values
    const username = this.signUpForm.get('username').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    //call the auth service
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        // if data is equal to success or whatever is coming back then set isRegistered to true
        if (data.message === 'success') {
          this.isRegistered = true;
          //then lets navigate via the router to the login page
          this.router.navigate(['/login']);
         
        }
      }
    )
    
  }



}
