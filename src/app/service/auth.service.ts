import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserAdmin';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CustomSnackbarService } from './snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.default.User | null = null;
  isLoggedInGuard:boolean=false;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private router: Router,private toastr:ToastrService,private snackService:CustomSnackbarService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
    }
    // Subscribe to auth state changes
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loggedIn.next(true);
        localStorage.setItem('currentUser', JSON.stringify(user)); // Optionally, store in localStorage
        this.isLoggedInGuard = true;
      } else {
        this.currentUser = null;
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser'); // Clear from localStorage on logout
        this.isLoggedInGuard =false;
        this.snackService.open("login failed","close",3000)
      }
    });
  }

  async login(admin: UserLogin) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(admin.email, admin.password);
      if (credential.user) {
        this.isLoggedInGuard = true;
        this.toastr.success('yest')
        console.log(this.toastr.success("hi"))
        this.snackService.open("login successfull",`welcome ${credential.user.email}`,3000)

        this.router.navigate(['/home']);

      }
    } catch (error) {
      this.isLoggedInGuard = false;
      console.error('Login error:', error);
      this.snackService.handleError(error)

      throw error;
    }
  }

  async signup(admin: UserLogin) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(admin.email, admin.password);
      if (credential.user) {
        this.isLoggedInGuard = true;
        this.snackService.open("Signup successfull",`welcome ${credential.user.email}`,3000)

        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.isLoggedInGuard = false;
      console.error('Signup error:', error);
      this.snackService.handleError(error);
      throw error;
    }
  
  }
getUserCookies():string{
  const storedUser=localStorage.getItem('currentUser');
    
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    console.log('my',userData.uid) 
    return userData.uid;
     
  }
  return '';
}
getUserEmail():string{
  const storedUser=localStorage.getItem('currentUser');
    
  if (storedUser) {
    const userData = JSON.parse(storedUser);
    console.log('my',userData.uid) 
    return userData.email;
     
  }
  return '';
}
  async logout() {
    try {
      await this.afAuth.signOut();
      localStorage.removeItem('currentUser');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  getUserId(): Observable<string | null> {
    return new Observable<string | null>(observer => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          observer.next(user.uid);
        } else {
          observer.next(null);
        }
      });
    });
  }

  getCurrentUserEmail(): string | null {
    return this.currentUser ? this.currentUser.email : '';
  }
}
