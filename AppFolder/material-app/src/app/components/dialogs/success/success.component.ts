import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styles: [
  ]
})
export class SuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) { }

  ngOnInit(): void {
  }
  
  message = "an unknown error occured"
}
