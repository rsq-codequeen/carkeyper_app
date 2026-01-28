import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IntakeService } from '../../services/intake.service';
import { VehicleService } from '../../services/vehicle.service'; 
import { Vehicle } from '../../vehicle-management/vehicle';
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-intake-vehicle',
  standalone: true,
  imports: [CommonModule,SharedModule,FormsModule],
  templateUrl: './intake-vehicle.component.html',
  styleUrl: './intake-vehicle.component.css'
})
export class IntakeVehicleComponent implements OnInit{
intakes: any[] = [];
  vehicles: Vehicle[] = [];
  isLoading = false;

  
  newIntake = {
    vehicle_id: null,
    customer_name: '',
    customer_contact: '',
    vehicle_plate: '',
    vehicle_details: '',
    description: ''
  };

  constructor(
    private intakeService: IntakeService,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading = true;
    // Load both history and fleet list
    this.intakeService.getAllIntakes().subscribe(data => this.intakes = data);
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
      this.isLoading = false;
    });
  }

 
 onFleetVehicleSelect(event: any): void {
  const selectedId = event.target.value;

  // Handle "Outside Vehicle" selection
  if (!selectedId || selectedId === 'null') {
    this.newIntake.vehicle_id = null;
    this.newIntake.vehicle_plate = '';
    this.newIntake.vehicle_details = '';
    return;
  }

  // Find the vehicle by checking both potential ID keys
  const selected = this.vehicles.find(v => (v.vehicle_id == selectedId || v.id == selectedId));

  if (selected) {
    this.newIntake.vehicle_plate = selected.registration_number;
    this.newIntake.vehicle_details = `${selected.make} ${selected.model} (${selected.color})`;
  }
}
onRelease(intakeId: number): void {
  if (confirm('Are you sure the work is complete and vehicle is ready?')) {
    this.intakeService.releaseVehicle(intakeId).subscribe({
      next: () => {
        alert('Vehicle Released!');
        this.loadInitialData(); // Refresh table to see 'Completed' status
      },
      error: (err) => console.error(err)
    });
  }
}
  onSubmit(): void {
    if (!this.newIntake.customer_name || !this.newIntake.vehicle_plate) {
      alert("Please enter Customer Name and Plate Number");
      return;
    }

    this.intakeService.saveIntake(this.newIntake).subscribe({
      next: () => {
        alert('Vehicle Intake Recorded!');
        this.resetForm();
        this.loadInitialData(); // Refresh the list
      },
      error: (err) => alert('Error recording intake: ' + err.error?.message)
    });
  }

  resetForm(): void {
    this.newIntake = {
      vehicle_id: null,
      customer_name: '',
      customer_contact: '',
      vehicle_plate: '',
      vehicle_details: '',
      description: ''
    };
  }
}