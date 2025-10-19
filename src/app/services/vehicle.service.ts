// src/app/services/vehicle.service.ts
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    private vehicles: any[] = [];
    private vehiclesSubject = new Subject<any[]>();

    getVehicles(): Observable<any[]> {
        return this.vehiclesSubject.asObservable();
    }

    addVehicle(vehicle: any) {
        this.vehicles.push(vehicle);
        this.vehiclesSubject.next(this.vehicles);
    }

    editVehicle(originalVehicle: any, updatedVehicle: any) {
        const index = this.vehicles.indexOf(originalVehicle);
        if (index !== -1) {
            this.vehicles[index] = updatedVehicle;
            this.vehiclesSubject.next(this.vehicles);
        }
    }

    deleteVehicle(vehicleToDelete: any) {
        this.vehicles = this.vehicles.filter(vehicle => vehicle !== vehicleToDelete);
        this.vehiclesSubject.next(this.vehicles);
    }
}