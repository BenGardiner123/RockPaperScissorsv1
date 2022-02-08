import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup

  isRegistered: boolean = false;

  constructor(
    private formBuilder: FormBuilder, private authService: AuthService
  ) { }
  

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), //add validator pattern 1 capital letter and 1 number
        Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
    })

  }


  onSubmit() {
    //get the values form the form
    const { username, email, password } = this.signupForm.value;
    //call the auth service
    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isRegistered = true;
      }
    )
    
  }



}
