import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../vehicle'; // Ensure this is the correct path and interface
import { HttpErrorResponse } from '@angular/common/http';
import { VehicleService } from '../../services/vehicle.service'; // Ensure correct path to service

@Component({
 selector: 'app-vehicleform',
 standalone: true,
 imports: [CommonModule, ReactiveFormsModule],
 templateUrl: './vehicleform.component.html',
 styleUrls: ['./vehicleform.component.css']
})
export class VehicleformComponent implements OnInit, OnChanges { // Added OnChanges implementation
 @Input() vehicle: Vehicle | null = null;
 @Output() close = new EventEmitter<void>();
 @Output() vehicleAdded = new EventEmitter<any>();
 @Output() vehicleUpdated = new EventEmitter<Vehicle>();
 
 // State management properties, similar to userform.ts
 isEditMode = false;
 loading = false;
 error: string | null = null;
 
 vehicleForm!: FormGroup;

 // patterns / allowed values
 private readonly regNumberRegex = /^[A-Z0-9-]{1,12}$/i;          // alphanumeric + dash
 private readonly alphaRegex = /^[A-Za-z ]{2,30}$/;
 private readonly alnumRegex = /^[A-Za-z0-9 \-]{1,40}$/;
 private readonly fueltypeRegex = /^(petrol|diesel|electric|hybrid)$/i;
 private readonly transmissionRegex = /^(manual|automatic)$/i;


 // Inject FormBuilder AND VehicleService
 constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

 ngOnInit(): void {
 this.isEditMode = !!this.vehicle; // Determine mode on init
 this.vehicleForm = this.fb.group({
 
  registration_number: ['', [Validators.required, Validators.pattern(this.regNumberRegex)]],
  type: ['', [Validators.required, Validators.pattern(this.alphaRegex)]],
  color: ['', [Validators.required, Validators.pattern(this.alphaRegex)]],
  make: ['', [Validators.required, Validators.pattern(this.alnumRegex)]],
  fueltype: ['', [Validators.required, Validators.pattern(this.fueltypeRegex)]],
  transmission: ['', [Validators.required, Validators.pattern(this.transmissionRegex)]],
  model: ['', [Validators.required, Validators.pattern(this.alnumRegex)]],
 });
 if (this.vehicle) {
  this.patchFormFromInput();
 }
 }
 ngOnChanges(changes: SimpleChanges) {
  if (changes['vehicle'] && !changes['vehicle'].isFirstChange()) {
   this.isEditMode = !!this.vehicle;
   this.patchFormFromInput();
  }
 }
 private patchFormFromInput() {
  if (!this.vehicle) return;
  this.vehicleForm.patchValue({
   registration_number: this.vehicle.registration_number ?? '',
   type: this.vehicle.type ?? '',
   color: this.vehicle.color ?? '',
   make: this.vehicle.make ?? '',
   fueltype: this.vehicle.fueltype ?? '',
   transmission: this.vehicle.transmission ?? '',
   model: this.vehicle.model ?? '',
//    assignedUsers: this.vehicle.assignedUsers ?? ''
  });
 }
 closeModal() {
  this.close.emit();
 }
//  // sanitize simple comma-separated assigned users (keeps digits and commas)
//  private sanitizeAssignedUsers(value: string) {
//  return (value || '').replace(/[^0-9, ]/g, '').trim();
//  }
 // API submission logic
 submit() {
  this.error = null;
  if (this.vehicleForm.invalid) {
   this.vehicleForm.markAllAsTouched();
   return;
  }
  const rawPayload = this.vehicleForm.value;
    
    // Construct payload for the backend (adjusting key case if necessary: e.g., fueltype -> fueltype)
    // NOTE: Assuming your backend expects 'fueltype' and 'transmission' (lowercase) based on SQL schema.
    const payload = {
        name: rawPayload.name,
        registration_number: rawPayload.registration_number,
        type: rawPayload.type,
        color: rawPayload.color,
        make: rawPayload.make,
        // Aligning to expected backend keys:
        fueltype: rawPayload.fueltype, 
        transmission: rawPayload.transmission, 
        model: rawPayload.model,
        // assignedUsers: this.sanitizeAssignedUsers(rawPayload.assignedUsers) 
    };
 this.loading = true;
    console.log('[DEBUG] Final Vehicle Payload Sent:', payload);


 // Determine if we are updating (PUT) or adding (POST)
 if (this.isEditMode && this.vehicle) {
  // UPDATE LOGIC
  // Use the primary key (vehicle_id or id) for the PUT request
  const vehicleId = (this.vehicle as any).vehicle_id || this.vehicle.id; 

        this.vehicleService.editVehicle(vehicleId, payload).subscribe({
 next: () => {
 this.loading = false;
                // Emit the updated vehicle object for list refresh
                this.vehicleUpdated.emit({ ...this.vehicle, ...payload });
                this.closeModal(); // Close modal on success
 },
 error: (err: HttpErrorResponse) => this.handleError(err)
 });
 } else {
        // ADD LOGIC
        this.vehicleService.addVehicle(payload).subscribe({
            next: (response) => {
                this.loading = false;
                // The backend returns the new vehicle ID (response.vehicleId), emit the completed object
                this.vehicleAdded.emit({ ...payload, vehicle_id: response.vehicleId }); 
                this.closeModal(); // Close modal on success
            },
            error: (err: HttpErrorResponse) => this.handleError(err)
        });
    }
 }

    private handleError(err: HttpErrorResponse): void {
        this.loading = false;
        console.error('Vehicle API Error:', err);
        // Display user-friendly error
        this.error = `Operation failed: ${err.error?.message || 'Server connection error.'}`;
    }
}