import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingDialogService } from '../dialogs/loading/loading-dialog.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class HttpLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingDialogService: LoadingDialogService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingDialogService.openDialog();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingDialogService.hideDialog();
      })
    ) as Observable<HttpEvent<any>>;
  }
}
