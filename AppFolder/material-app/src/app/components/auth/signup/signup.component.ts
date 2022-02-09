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

  openErrorDialog() {
    this.dialog.open(ErrorComponent);
  }

  openSuccessDialog() {
    this.dialog.open(SuccessComponent);
  }


  onSignupSubmit() {

    //get the form values
    const username = this.signUpForm.get('username').value;
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;

    let usernameTaken = false;

    if (this.playerService.listOfPlayers.includes(username)) {
      this.openErrorDialog();
      //clear the form
      this.signUpForm.reset();
      return;
    }
    this.playerService.postNewPlayer(username).subscribe({
      next: (data) => {
        if (data.status == 'Success'){
          this.openSuccessDialog();
        }

        //navigate to the login component
        this.router.navigate(['/login']);
      }
    });

  }
  

      
        
      
  


     

    

   

  } 
