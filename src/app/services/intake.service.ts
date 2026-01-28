import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {
  private intakeUrl = `${API_URL}/intakes`;

  constructor(private http: HttpClient) { }

  saveIntake(data: any): Observable<any> {
    return this.http.post(this.intakeUrl, data);
  }

  getAllIntakes(): Observable<any[]> {
    return this.http.get<any[]>(this.intakeUrl);
  }
  releaseVehicle(intakeId: number): Observable<any> {
  return this.http.put(`${this.intakeUrl}/release/${intakeId}`, {});
}
getVehicleHistory(vehicleId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.intakeUrl}/history/${vehicleId}`);
}
getQuickStats(): Observable<any> {
  return this.http.get<any>(`${this.intakeUrl}/stats/summary`);
}
}