import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { VehicleService } from '../../services/vehicle.service'; 
import { Subscription } from 'rxjs';
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
export class VehicledataComponent {
  selectedVehicle?:Vehicle
   currentDate = new Date(); 
      vehicles:any[]=[]
      private usersSubscription!: Subscription;
      private vehicleService = inject(VehicleService);

      showModal = false;
      constructor() {}
  
      ngOnInit(): void {
        // Subscribe to the correct observable from the new service
        this.usersSubscription = this.vehicleService.getVehicles().subscribe(
            (latestVehicles) => {
                this.vehicles = latestVehicles; // Note: you might want to rename this to `vehicles`
                console.log('Received new vehicle list:', this.vehicles);
            }
        );
    }
     ngOnDestroy(): void {
      if (this.usersSubscription) {
        this.usersSubscription.unsubscribe();
      }
    }
   
    onDelete(vehicle: any) {
        this.vehicleService.deleteVehicle(vehicle); 
    }

      openAddUserModal(){
    this.selectedVehicle = undefined;
    this.showModal = true;
  }
   openEditModal(vehicle: Vehicle) {
       this.selectedVehicle = vehicle;
       this.showModal = true;
     }
     closeModal() {
    this.showModal = false;
  }

  OnVehicleAdded(newVehicle:any){
    if(typeof(this.vehicleService as any).addVehicle==='function'){
      (this.vehicleService as any).addVehicle(newVehicle);
    } else{
      this.vehicles=[newVehicle,...this.vehicles];
    }
    this.closeModal()
  }

  onVehicleUpdated(updatedVehicle: Vehicle) {
      if (this.selectedVehicle) {
        // call service editUser (task.service has editUser(original, updated))
        if (typeof (this.selectedVehicle as any).editUser === 'function') {
          (this.vehicleService as any).editUser(this.selectedVehicle, updatedVehicle);
        } else {
          // fallback: replace locally by id or reference
          const idx = this.vehicles.findIndex(u => (u.id != null && this.selectedVehicle?.id != null) ? u.id === this.selectedVehicle.id : u === this.selectedVehicle);
          if (idx !== -1) {
            this.vehicles[idx] = { ...updatedVehicle, id: this.selectedVehicle.id ?? updatedVehicle.id };
          }
        }
      }
      this.selectedVehicle = undefined;
      this.closeModal();
    }
}

