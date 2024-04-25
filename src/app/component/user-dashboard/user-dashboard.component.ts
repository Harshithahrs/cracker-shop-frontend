import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  userEmail!: string;
  isLoggedIn$!: Observable<boolean>;
  
  backgroundImageUrl = 'assets/img/bhole.jpg';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const user = this.authService.getUserCookies();
    const email=this.authService.getCurrentUserEmail();
    if (user && email) {
      this.userEmail = email;
    } else {
      this.userEmail = '';
    }
    this.isLoggedIn$ = this.authService.isLoggedIn();

    // Check if session has expired
    // const sessionExpirationDate = this.getSessionExpirationDate();
    // if (sessionExpirationDate && sessionExpirationDate < new Date()) {
    //   this.logoutAndRedirect();
    // }
  }

  // private getSessionExpirationDate(): Date {
  //   const expirationDateString = localStorage.getItem('sessionExpiration');
  //   if (expirationDateString) {
  //     return new Date(expirationDateString);
  //   }
  //   return null;
  // }

  // private setSessionExpirationDate() {
  //   const expirationDate = new Date();
  //   expirationDate.setDate(expirationDate.getDate() + SESSION_EXPIRATION_DAYS);
  //   localStorage.setItem('sessionExpiration', expirationDate.toISOString());
  // }

  onLogout() {
    this.authService.logout()
    this.logoutAndRedirect();
  }

  private logoutAndRedirect() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); // Optional: Navigate to the login page after logout
  }

  redirectToLogin(){
    this.router.navigate(['/login']);
  }
}

