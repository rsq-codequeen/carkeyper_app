import { Injectable } from '@angular/core';
import { API_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = API_URL;
  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {

    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }
}
