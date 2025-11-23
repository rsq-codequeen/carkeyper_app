// src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { Vehicle } from '../vehicle-management/vehicle';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private VehicleUrl = `${API_URL}/vehicles`;
  constructor(private http: HttpClient) { }

  // private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);

  // expose read-only observable
  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.VehicleUrl);
  }

  // add a vehicle and emit updated list
  addVehicle(vehicle: Vehicle): Observable<any> {
    return this.http.post(this.VehicleUrl, vehicle);
  }

  editVehicle(vehicleId: number, updatedVehicleData: Partial<Vehicle>): Observable<any> {
    return this.http.put(`${this.VehicleUrl}/${vehicleId}`, updatedVehicleData);
  }
  

  // delete a vehicle (by id when available)
  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete(`${this.VehicleUrl}/${vehicleId}`);
  }

  
}