import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  // UI State properties
  errorMessage = '';
  showToast = false;
  isError = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    // 1. Check for empty fields before calling the service
    if (!this.credentials.email || !this.credentials.password) {
      this.triggerError('Access Denied: Missing digital signature or key.');
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.saveTokenAndReset(response.accessToken);
      },
      error: (err) => {
        // 2. Handle wrong password/unauthorized
        const backendMsg = err.error?.message || 'Authentication failed. Check credentials.';
        this.triggerError(backendMsg);
        console.error('Login Error:', err);
      }
    });
  }

  // Helper method to handle the tactical feedback
  private triggerError(msg: string): void {
    this.errorMessage = msg;
    this.showToast = true;
    this.isError = true;

    // Reset the UI states after 3 seconds (let the animation play)
    setTimeout(() => {
      this.showToast = false;
      this.isError = false;
    }, 3000);
  }

  private saveTokenAndReset(token: string): void {
    localStorage.setItem('accessToken', token);
    this.router.navigate(['/user/userdata']);
  }
}