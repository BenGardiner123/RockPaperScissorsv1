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


  listOfUsers: string[] = [];

  error: string;

  authenticationFailed = false;

  constructor(
    private authService: AuthService,
    private playerService: PlayerService,
    private router: Router,
    private dialog: MatDialog,


  ) { }


  ngOnInit() {
    this.playerService.checkUserNameNotTaken();
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

   

    if (this.playerService.listOfPlayers.includes(username)) {
      this.error = 'Username already taken';
      this.dialog.open(ErrorComponent, { width: '20%', data: { message: this.error } });
      //clear the form
      this.signUpForm.reset();
      return;
    }

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log("regiater response data", data);
        if(data.status == 'Error'){
          this.authenticationFailed = true;
          //this.dialog.open(ErrorComponent, { width: '20%', data: { message: this.error } });
           //clear the form
          this.signUpForm.reset();
          ;
        }
        
      }
    });

    if(this.authenticationFailed){
      
      //clear the form
      this.signUpForm.reset();
      
    } 
    if(this.authenticationFailed == false){
      console.log('success', this.authenticationFailed);
      this.playerService.postNewPlayer(username).subscribe({
        next: (data) => {
          console.log("regiater response data", data);
          if (data.status == 'Success'){
            this.dialog.open(SuccessComponent, { width: '20%', data: { message: data.message } });
          }
  
          //navigate to the login component
          this.router.navigate(['/login']);
        }
      });
    }
    
    
  }
}
