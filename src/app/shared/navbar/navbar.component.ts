import { Component,AfterViewInit,Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { initTooltips } from 'flowbite';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit{
     @Input() message: string = '';
    isDropdownOpen: boolean = false;
    
      ngAfterViewInit() {
        if (typeof document !== 'undefined') {
          initTooltips();
        }
      }
      constructor(private router: Router, private authService: AuthService) { } 
      toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
      
  onLogoutClick(): void {
    // 1. Close dropdown
    this.isDropdownOpen = false;

    // 2. Call the service to perform the backend invalidation
    this.authService.logoutBackend().subscribe({
      next: () => {
        // 3. Clear local storage and state
        this.authService.performClientLogout(); 
        
        // 4. Navigate to the login page (or wherever your main landing page is)
        this.router.navigate(['/registration']); // Assuming '/registration' is your login/landing page
      },
      error: (err) => {
        console.error('Logout failed on server, but forcing client logout:', err);
        // CRITICAL: Even if the backend call fails (e.g., network error), 
        // we must still log the user out on the client side for security.
        this.authService.performClientLogout();
        this.router.navigate(['/registration']);
      }
    });
  }
}
