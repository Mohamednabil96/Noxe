import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MoviesInterceptor implements HttpInterceptor {

  apiKey: string = 'api_key=adbde5bd448af6fa06ed31189c8e1011';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   console.log(request.url);
   request = request.clone({
    url: request.url.replace("api_key", this.apiKey)
   })
   
    return next.handle(request);
  }
}




