import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../vehicle-management/vehicle';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit, OnChanges {
  @Input() user?: User;
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();
  @Output() userUpdated = new EventEmitter<any>();
  userForm!: FormGroup;
  vehicles: Vehicle[] = [];
  private readonly flexiblePkPhoneRegex = /^(\+92|92|0)3\d{9}$/;
  constructor(private fb: FormBuilder,
    private vehicleService: VehicleService,
  private userService: UserService) {}

  private getRoleId(roleName: string): number {
    switch (roleName.toLowerCase()) {
        case 'admin': return 1;
        case 'driver': return 2;
        case 'mechanic': return 3;
        default: return 2; 
    }
}
  ngOnInit(): void {
    this.fetchVehicles();
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      contact: [
        '', 
        [
          Validators.required,
          Validators.pattern(this.flexiblePkPhoneRegex)
        ]
      ],
      role: ['', Validators.required],
      assignedVehicles: ['']
    });

    if (this.user) {
      this.patchFormFromInput();
    }
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].isFirstChange()) {
      this.patchFormFromInput();
    }
  }

  private patchFormFromInput() {
  if (!this.user) return;

  // Find the ID of the vehicle that matches the string in the user object
  const matchingVehicle = this.vehicles.find(v => 
    v.model === this.user?.assignedVehicles || 
    `${v.model} (${v.registration_number})` === this.user?.assignedVehicles
  );

  this.userForm.patchValue({
    first_name: this.user.first_name ?? '',
    last_name: this.user.last_name ?? '',
    email: this.user.email ?? '',
    contact: this.user.contact ?? '',
    role: this.user.role ?? 'driver',
    // Set the dropdown to the ID, not the string
    assignedVehicles: matchingVehicle ? matchingVehicle.id : ''
  });
}

  sanitizeAndLimitContact(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    let sanitizedValue = value.replace(/[^0-9+]/g, '');
    const plusIndex = sanitizedValue.indexOf('+');
    if (plusIndex > 0) {
        sanitizedValue = sanitizedValue.replace('+', '');
    } else if (plusIndex === 0) {
        const remainingDigits = sanitizedValue.substring(1).replace(/\+/g, '');
        sanitizedValue = '+' + remainingDigits;
    }
    sanitizedValue = sanitizedValue.replace(/\D/g, '').slice(0, 11);
    this.userForm.get('contact')?.setValue(sanitizedValue, { emitEvent: false });
    input.value = sanitizedValue;
  }

  closeModal() {
    this.close.emit();
  }


submit() {
    if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        return; 
    }

    // 1. Convert the dropdown selection to a real Number or null
    const selectedValue = this.userForm.get('assignedVehicles')?.value;
    const vehicleIdNum = (selectedValue && selectedValue !== 'None') ? Number(selectedValue) : null;

    // 2. Build the payload exactly as the backend expects it
    const payload: any = { 
        first_name: this.userForm.value.first_name,
        last_name: this.userForm.value.last_name,
        email: this.userForm.value.email,
        contact_number: this.userForm.value.contact, 
        role_id: this.getRoleId(this.userForm.value.role),
        vehicleId: vehicleIdNum  // <--- This MUST be the number (e.g., 2)
    };

    if (this.user && this.user.id) {
        payload.id = this.user.id;
        this.userUpdated.emit(payload);
    } else {
        this.userAdded.emit(payload);
    }

    console.log('Final payload sent to parent:', payload);
    this.closeModal();
}
fetchVehicles(): void {
   
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        console.log('Fetched vehicles for dropdown:', this.vehicles);
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);

      }
    });
  }
}
