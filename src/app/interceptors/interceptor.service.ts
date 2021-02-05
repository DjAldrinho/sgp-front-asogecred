import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private userService: UserService,
    private router: Router) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.token}`
    });

    const reqClone = req.clone({
      headers: headers
    });

    return next.handle(reqClone).pipe(
      tap(
        () => {},
        (err : any) => {
          if (err instanceof HttpErrorResponse){
            if(err.status !== 401){
              return;
            }
            localStorage.removeItem("token");
            this.userService.user = null;
            this.router.navigateByUrl('/login');
          }
        }
      )
    );
  }
}
