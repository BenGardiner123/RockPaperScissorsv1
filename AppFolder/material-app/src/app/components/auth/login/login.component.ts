import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private auth: AuthService, private router: Router) { }
  
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
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

   this.auth.login(username, password).subscribe({
      next: (data) => {
        console.log(data);
        if (data.token !== null) {
          this.router.navigate(['/rounds']);
        }
      }
   }
  )}

}
