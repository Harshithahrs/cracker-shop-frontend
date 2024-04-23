import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  getCurrentUser(){
    return this.authService.currentUser;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authService.isLoggedInGuard){
      console.log("Access Granted...");
      return true;
    }
    else{
      console.log('you dont have permission to access this page...');
      console.log(this.authService.isLoggedInGuard);
      setTimeout(() => {
        console.log(this.authService.isLoggedInGuard)
      }, 2000);
      this.router.navigate(['/login']);
      return false;
    }
  }
  }

