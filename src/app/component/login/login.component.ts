import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../model/UserAdmin';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isUserLoggedIn!: Observable<boolean>;
  constructor(private fb:FormBuilder,private auth:AuthService){
    this.isUserLoggedIn = this.auth.isLoggedIn();
  }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const loginData:UserLogin=
    {
     email : this.loginForm.value.username,
     password : this.loginForm.value.password
  }
    this.auth.login(loginData);    
    // Implement your authentication logic here
  }

}