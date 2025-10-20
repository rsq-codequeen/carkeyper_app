import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vehicleform.component.html',
  styleUrls: ['./vehicleform.component.css']
})
export class VehicleformComponent implements OnInit, OnChanges {
   @Input() vehicle?: Vehicle;
  @Output() close = new EventEmitter<void>();
  @Output() vehicleAdded = new EventEmitter<any>();
    @Output() vehicleUpdated = new EventEmitter<Vehicle>();
    
  vehicleForm!: FormGroup;

  // patterns / allowed values
  private readonly regNumberRegex = /^[A-Z0-9-]{1,12}$/i;          // alphanumeric + dash
  private readonly alphaRegex = /^[A-Za-z ]{2,30}$/;
  private readonly alnumRegex = /^[A-Za-z0-9 \-]{1,40}$/;
  private readonly feulTypeRegex = /^(petrol|diesel|electric|hybrid)$/i;
  private readonly transmissionRegex = /^(manual|automatic)$/i;
  private readonly assignedUsersRegex = /^[0-9, ]*$/;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(this.alphaRegex)]],
      registration_number: ['', [Validators.required, Validators.pattern(this.regNumberRegex)]],
      type: ['', [Validators.required, Validators.pattern(this.alphaRegex)]],
      color: ['', [Validators.required, Validators.pattern(this.alphaRegex)]],
      make: ['', [Validators.required, Validators.pattern(this.alnumRegex)]],
      feulType: ['', [Validators.required, Validators.pattern(this.feulTypeRegex)]],
      Transmission: ['', [Validators.required, Validators.pattern(this.transmissionRegex)]],
      model: ['', [Validators.required, Validators.pattern(this.alnumRegex)]],
      assignedUsers: ['', [Validators.pattern(this.assignedUsersRegex)]]
    });

    if (this.vehicle) {
      this.patchFormFromInput();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vehicle'] && !changes['vehicle'].isFirstChange()) {
      this.patchFormFromInput();
    }
  }

  private patchFormFromInput() {
    if (!this.vehicle) return;
    this.vehicleForm.patchValue({
      name: this.vehicle.name ?? '',
      registration_number: this.vehicle.registration_number ?? '',
      type: this.vehicle.type ?? '',
      color: this.vehicle.color ?? '',
      make: this.vehicle.make ?? '',
      feulType: this.vehicle.feulType ?? '',
      Transmission: this.vehicle.Transmission ?? '',
      model: this.vehicle.model ?? '',
      assignedUsers: this.vehicle.assignedUsers ?? ''
    });
  }

  closeModal() {
    this.close.emit();
  }

  // sanitize simple comma-separated assigned users (keeps digits and commas)
  private sanitizeAssignedUsers(value: string) {
    return (value || '').replace(/[^0-9, ]/g, '').trim();
  }

  submit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      return;
    }

    const form = this.vehicleForm.value;
    const payload: any = {
      name: form.name,
      registration_number: form.registration_number.toUpperCase(),
      type: form.type,
      color: form.color,
      make: form.make,
      feulType: form.feulType.toLowerCase(),
      Transmission: form.Transmission.toLowerCase(),
      model: form.model,
      assignedUsers: this.sanitizeAssignedUsers(form.assignedUsers),
      updatedAt: new Date()
    };

    if (this.vehicle && (this.vehicle as any).id != null) {
      payload.id = (this.vehicle as any).id;
      this.vehicleUpdated.emit(payload);
    } else {
      payload.createdAt = new Date();
      this.vehicleAdded.emit(payload);
    }

    this.close.emit();
  }
}
