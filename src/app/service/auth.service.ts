import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserAdmin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async login(admin: UserLogin) {
    try {
      const credential = await this.afAuth.signInWithEmailAndPassword(admin.email, admin.password);
      if (credential.user) {
        // Redirect to home page upon successful login
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(admin: UserLogin) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(admin.email, admin.password);
      if (credential.user) {
        // Redirect to home page upon successful signup
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async getCurrentUserToken() {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        return token;
      }
      return null;
    } catch (error) {
      console.error('Get user token error:', error);
      throw error;
    }
  }
}

