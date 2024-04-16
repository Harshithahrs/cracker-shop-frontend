import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '../../model/UserAdmin';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    })
    // }, { validator: this.passwordMatchValidator });
  }

  // Custom validator to check if password and confirmPassword match
 // Custom validator to check if password and confirmPassword match
 passwordMatchValidator(form: FormGroup) {
  const passwordControl = form.get('password');
  const confirmPasswordControl = form.get('confirmPassword');

  if (passwordControl && confirmPasswordControl) {
    const passwordValue = passwordControl.value;
    const confirmPasswordValue = confirmPasswordControl.value;

    if (passwordValue !== confirmPasswordValue) {
      confirmPasswordControl.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl.setErrors(null);
    }
  }
}


  // Convenience getter for easy access to form controls
  get f() { return this.signupForm.controls; }

  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    
    const signupData: UserLogin = {
      email: this.signupForm.value.username,
      password: this.signupForm.value.password
    };

    // Call signup method from AuthService with the signupData object
    this.auth.signup(signupData);
  }
}
