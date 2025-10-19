import { Component,ViewChild,OnInit,OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { VehicleService } from '../../services/vehicle.service'; 
import { Subscription } from 'rxjs';
import { VehicleformComponent } from '../../shared/vehicleform/vehicleform.component';


@Component({
  selector: 'app-vehicledata',
  standalone: true,
  imports: [SharedModule,
    CommonModule,
  ],
  templateUrl: './vehicledata.component.html',
  styleUrl: './vehicledata.component.css'
})
export class VehicledataComponent {
   currentDate = new Date(); 
      users:any[]=[]
      private usersSubscription!: Subscription;
      private vehicleService = inject(VehicleService);
      constructor() {}
  
  
      @ViewChild(VehicleformComponent) userformModal!: VehicleformComponent;
      ngOnInit(): void {
        // Subscribe to the correct observable from the new service
        this.usersSubscription = this.vehicleService.getVehicles().subscribe(
            (latestVehicles) => {
                this.users = latestVehicles; // Note: you might want to rename this to `vehicles`
                console.log('Received new vehicle list:', this.users);
            }
        );
    }
     ngOnDestroy(): void {
      if (this.usersSubscription) {
        this.usersSubscription.unsubscribe();
      }
    }
   
    onDelete(vehicle: any) {
        this.vehicleService.deleteVehicle(vehicle); // 👈 Call the correct method
    }

      onEdit(vehicle: any) {
        this.userformModal.userData = vehicle;
        this.openUserFormModal();
    }
    openUserFormModal() {
      this.userformModal.open();
    }
     
}

