import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterUserRequestModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerService } from 'src/app/services/player.service';
import { ErrorComponent } from '../../dialogs/error/error.component';
import { SuccessComponent } from '../../dialogs/success/success.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private dialog: MatDialog,


  ) { }


  ngOnInit() {
   this.getLisOfCurrentUsers();
  
  }

  signUpForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),
    //add validator pattern 1 capital letter and 1 number and no special characters
    Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),

  });

  getLisOfCurrentUsers() {
    this.playerService.checkUserNameNotTaken();
  }


  openErrorDialog() {
    this.dialog.open(ErrorComponent);
  }

  openSuccessDialog() {
    this.dialog.open(SuccessComponent, {  data: {message: 'You have successfully signed up'}} );
  }


  onSignupSubmit() {
    //console.log the list of users
    console.log(this.playerService.listOfPlayers);

    //get the form values
    const username = this.signUpForm.get('username').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    console.log("users", this.playerService.listOfPlayers);
    let usernameTaken = false;
    
    if (this.playerService.listOfPlayers.includes(username)) {
      usernameTaken = true;
      this.signUpForm.reset();
      throw Error( 'Username already taken');
    }


    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        if(data.status != 'Success'){
          throw Error('Username already registered');
        }
      }
    });

    
    this.playerService.postNewPlayer(username).subscribe({
      next: (data) => {
        if (data.status == 'Success'){
          this.openSuccessDialog();
           //navigate to the login component
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        throw Error(err);
      }
    });

  }
  

      
        
      
  


     

    

   

  } 
