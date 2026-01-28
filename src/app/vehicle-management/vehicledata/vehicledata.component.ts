import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { VehicleService } from '../../services/vehicle.service'; 
import { IntakeService } from '../../services/intake.service';
// import { VehicleformComponent } from '../../shared/vehicleform/vehicleform.component';
import { Vehicle } from '../vehicle';
import { VehicleformComponent } from "../vehicleform/vehicleform.component";

@Component({
  selector: 'app-vehicledata',
  standalone: true,
  imports: [SharedModule,
            CommonModule, VehicleformComponent],
  templateUrl: './vehicledata.component.html',
  styleUrl: './vehicledata.component.css'
})
export class VehicledataComponent implements OnInit{
      historyLog: any[] = [];
showHistoryModal: boolean = false;
selectedVehicleForHistory: any = null;

   currentDate = new Date(); 
      vehicles: Vehicle[] = [];
      selectedVehicle: Vehicle | null = null;
      showModal: boolean = false;
      isLoading: boolean = true;
      
      constructor(private vehicleService: VehicleService,private intakeService: IntakeService) { }
  
      ngOnInit(): void {
        this.loadVehicles(); // Load vehicles on component initialization
    }
    // --- Load Vehicles Method
    loadVehicles(): void {
        this.isLoading = true;
        this.vehicleService.getVehicles().subscribe({
            next: (data) => {
                this.vehicles = data; // Set the list from the API response
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load vehicles:', err);
                this.isLoading = false;
                // Add error handling feedback here (e.g., a message)
            }
        });
    }
    viewHistory(vehicle: Vehicle): void {
    const vehicleId = (vehicle as any).vehicle_id || vehicle.id;
    this.selectedVehicleForHistory = vehicle;
    
    this.intakeService.getVehicleHistory(vehicleId).subscribe({
        next: (data) => {
            this.historyLog = data;
            this.showHistoryModal = true;
        },
        error: (err) => console.error(err)
    });
}
     
   
   onDelete(vehicle: Vehicle): void {
        // Use vehicle_id (or whatever the primary key field is named in Vehicle interface)
        const vehicleId = (vehicle as any).vehicle_id || vehicle.id; 
        
        if (!vehicleId || !confirm(`Confirm hard delete for ${vehicle.registration_number}?`)) {
            return;
        }

        this.vehicleService.deleteVehicle(vehicleId).subscribe({
            next: () => {
                // Optimistically update the list without a full reload
                this.vehicles = this.vehicles.filter(v => (v as any).vehicle_id !== vehicleId);
            },
            error: (err) => {
                console.error('API Error deleting vehicle:', err);
                alert(`Deletion failed: ${err.error?.message || 'Server error'}`);
            }
        });
    }

     openAddUserModal(): void { // I assume this should be openAddVehicleModal
        this.selectedVehicle = null;
        this.showModal = true;
    }
   openEditModal(vehicle: Vehicle): void {
        this.selectedVehicle = vehicle;
        this.showModal = true;
    }
     closeModal(): void {
        this.showModal = false;
        this.selectedVehicle = null;
    }

  OnVehicleAdded(newVehicle: Vehicle): void {
        this.loadVehicles(); 
        this.closeModal();
    }

  onVehicleUpdated(updatedVehicle: Vehicle): void {
        this.loadVehicles(); 
        this.closeModal();
    }
}

