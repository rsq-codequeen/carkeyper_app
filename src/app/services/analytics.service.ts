// analytics.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private apiUrl = `${API_URL}`;

  constructor(private http: HttpClient) {}

  getFleetStats(): Observable<any> {
    // This calls your real DB via your backend API
    return this.http.get(`${this.apiUrl}/stats`);
  }
}