import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  errorMessage: string = '';
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9]*$') // only alphanumeric characters
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$') // at least one uppercase, one lowercase, and one number
      ]]
    });
  }

  // Getter methods for easy access in template
  get formControls() {
    return this.userForm.controls;
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  onRegister() {
    this.submitted = true;

    if (this.userForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form';
      return;
    }

    // Clear any previous error messages
    this.errorMessage = '';

    const formValue = this.userForm.value;

    try {
      // Simulate registration success
      alert('Registration successful! Welcome ' + formValue.username);
      
      // Store user data in localStorage (for demo purposes)
      localStorage.setItem('registeredUser', JSON.stringify({
        username: formValue.username,
        registeredAt: new Date()
      }));

      // Reset form and submission state
      this.userForm.reset();
      this.submitted = false;

      // Redirect to home page after successful registration
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1500);
    } catch (error) {
      this.errorMessage = 'Registration failed. Please try again.';
      console.error('Registration error:', error);
    }
  }

  // Method to check if a field has errors
  hasError(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched || this.submitted));
  }

  // Method to get error message for a field
  getErrorMessage(field: string): string {
    const control = this.userForm.get(field);
    
    if (!control || !control.errors) return '';

    const errors = control.errors;
    
    if (errors['required']) return `${field} is required`;
    if (errors['minlength']) return `${field} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['pattern']) {
      if (field === 'username') return 'Username can only contain letters and numbers';
      if (field === 'password') return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    return 'Invalid input';
  }
} 