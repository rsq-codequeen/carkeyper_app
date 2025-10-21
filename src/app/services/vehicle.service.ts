// src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../vehicle-management/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiclesSubject = new BehaviorSubject<Vehicle[]>([]);

  // expose read-only observable
  getVehicles(): Observable<Vehicle[]> {
    return this.vehiclesSubject.asObservable();
  }

  // add a vehicle and emit updated list
  addVehicle(vehicle: Vehicle) {
    const current = this.vehiclesSubject.value || [];
    const newVehicle: Vehicle = {
      ...vehicle,
      id: vehicle.id ?? Date.now(),
      createdAt: (vehicle as any).createdAt ?? new Date()
    } as Vehicle;
    this.vehiclesSubject.next([newVehicle, ...current]);
  }

  // edit/replace a vehicle (matches by id when available)
  editVehicle(originalVehicle: Vehicle, updatedVehicle: Vehicle) {
    const current = this.vehiclesSubject.value || [];
    const index = current.findIndex(v =>
      (v.id != null && originalVehicle.id != null) ? v.id === originalVehicle.id : v === originalVehicle
    );
    if (index !== -1) {
      const copy = [...current];
      copy[index] = { ...updatedVehicle, id: originalVehicle.id ?? updatedVehicle.id, updatedAt: new Date() } as Vehicle;
      this.vehiclesSubject.next(copy);
    }
  }

  // delete a vehicle (by id when available)
  deleteVehicle(vehicleToDelete: Vehicle) {
    const current = this.vehiclesSubject.value || [];
    const filtered = current.filter(v =>
      (v.id != null && vehicleToDelete.id != null) ? v.id !== vehicleToDelete.id : v !== vehicleToDelete
    );
    this.vehiclesSubject.next(filtered);
  }

  // optional: seed initial list
  setInitialVehicles(vehicles: Vehicle[]) {
    this.vehiclesSubject.next(vehicles);
  }
}