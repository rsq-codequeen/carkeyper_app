import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    credentials = {
    email: '', // Corresponds to the input field 'name="email"'
    password: '' // Corresponds to the input field 'name="password"'
  };
  errorMessage = '';
  constructor(
    private authService: AuthService, 
    private router: Router // Inject Router
  ) { }
  onSubmit():void{
    this.authService.login(this.credentials).subscribe({
      next:(respone)=>{
        this.saveTokenAndReset(respone.accessToken)
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed. Please check credentials.';
        console.error('Login Error:', err);
      }
        
    })
  }
  private saveTokenAndReset(token: string): void{
    localStorage.setItem('accessToken',token);
    this.router.navigate(['/user/userdata']);
  }

}
