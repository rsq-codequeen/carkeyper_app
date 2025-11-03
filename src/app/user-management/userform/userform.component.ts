import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit, OnChanges {
  @Input() user?: User; // incoming user for edit
  @Output() close = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();
  @Output() userUpdated = new EventEmitter<any>();

  userForm!: FormGroup;

  private readonly flexiblePkPhoneRegex = /^(\+92|92|0)3\d{9}$/;
  constructor(private fb: FormBuilder) {}

  private getRoleId(roleName: string): number {
    switch (roleName.toLowerCase()) {
        case 'Admin': return 1;
        case 'Driver': return 2;
        case 'Mechanic': return 3;
        default: return 2; // Default to Driver
    }
}
  ngOnInit(): void {
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
      role: ['driver', Validators.required],
      assignedVehicles: ['']
    });

    // if user provided at init, patch the form
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
    // Normalize contact to string
    const contact = this.user.contact ?? '';
   this.userForm.patchValue({
    // --- FIX HERE: Patching with separate names ---
    first_name: this.user.first_name ?? '',
    last_name: this.user.last_name ?? '',
    // ---------------------------------------------
    email: this.user.email ?? '',
    // --- FIX HERE: Form control name is 'contact' ---
    contact: String(contact), 
    // ------------------------------------------------
    role: this.user.role ?? 'driver',
    assignedVehicles: this.user.assignedVehicles ?? ''
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

  // src/app/user-management/userform/userform.component.ts

submit() {
    // 1. Check form validity
    if (this.userForm.invalid) {
        this.userForm.markAllAsTouched();
        // Return immediately if validation fails
        return; 
    }

    // 2. Sanitize and format contact number
    const rawContact = this.userForm.value.contact || '';
    let sanitizedContact = rawContact.replace(/\D/g, '');

    if (sanitizedContact.startsWith('92')) {
        sanitizedContact = '0' + sanitizedContact.substring(2);
    } else if (!sanitizedContact.startsWith('0') && sanitizedContact.length === 10) {
        sanitizedContact = '0' + sanitizedContact;
    }
    
    // 3. Map role name to role_id
    const rawRole = this.userForm.value.role;
    const roleId = this.getRoleId(rawRole); // Assumes getRoleId is correct
    
    // --- DEBUGGING: Check values before payload creation ---
    console.log('[DEBUG] Raw Role Value:', rawRole);
    console.log('[DEBUG] Calculated Role ID:', roleId);
    // ------------------------------------------------------

    // 4. Construct the Backend-Compatible Payload
    const payload: any = { 
        // Ensure all required backend fields are present
        first_name: this.userForm.value.first_name,
        last_name: this.userForm.value.last_name,
        email: this.userForm.value.email,
        contact_number: sanitizedContact, 
        role_id: roleId, // CRITICAL: This MUST be a number (1, 2, or 3)
        
        // Include optional fields for completeness
        assignedVehicles: this.userForm.value.assignedVehicles || '',
    };
    
    // 5. Determine whether to Add or Update (based on presence of this.user)
    if (this.user && (this.user.id != null)) {
        // For Update: Ensure the ID is attached to the payload
        payload.id = this.user.id;
        this.userUpdated.emit(payload);
    } else {
        // For Add: No ID needed (backend generates it)
        this.userAdded.emit(payload);
    }
    
    // --- FINAL DEBUGGING STEP ---
    console.log('[DEBUG] Final Payload Sent:', payload);
    // ----------------------------
}
}
