import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
    private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.validateToken().pipe(
      tap(isAuth => {
        if(!isAuth){
          this.router.navigateByUrl('/login');
        }else{
          return true;
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]){
    return this.userService.validateToken().pipe(
      tap(isAuth => {
        console.log(isAuth);
        if(!isAuth){
          this.router.navigateByUrl('/login');
        }else{
          return true;
        }
      })
    );
  }

}
