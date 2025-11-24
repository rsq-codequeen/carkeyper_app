import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable,tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = API_URL;
  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }
  logoutBackend(): Observable<any> {
    // Call the backend route that destroys the session/refresh token
    return this.http.post(`${this.apiUrl}/api/logout`, {}).pipe(
      tap(() => {
        // You can add logging here if the API call is successful
        console.log('Backend session invalidated.');
      })
    );
  }
  performClientLogout(): void {
    // Remove stored tokens/user data from local storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    
    // You might also want to reload the page to completely reset the application state:
    // window.location.reload(); 
    
    console.log('Client data cleared. User logged out.');
  }
}
