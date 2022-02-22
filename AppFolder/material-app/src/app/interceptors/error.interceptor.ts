import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../components/dialogs/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler){
        //we dont want to edit the request on the way out so
        //handle gives us back t eh response observable stream 
        return next.handle(req).pipe(
            //using the pipe above we can access the catcherror operator from rxjs
            catchError((error: HttpErrorResponse) => {
                console.log(error);
                //we add the data object as a second argument and pass in the above
                //open the dialog with the http error response
                
                this.dialog.open(ErrorComponent, {data: {message: error.error.message}});
                //throw error adds an obserable so wew can handle it inside or the relevant component
                return throwError(error.message)
            })
        );
    }
}
