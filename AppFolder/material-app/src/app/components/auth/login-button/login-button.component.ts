import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

 


  constructor(public  auth: AuthService) { 

  }

  ngOnInit(): void {
   
  }

  logout() {
    this.auth.logout();
  } 

 

}
