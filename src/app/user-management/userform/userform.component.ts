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
  @Output() userUpdated = new EventEmitter<User>();

  userForm!: FormGroup;

  private readonly flexiblePkPhoneRegex = /^(\+92|92|0)3\d{9}$/;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
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
      name: this.user.name ?? '',
      email: this.user.email ?? '',
      contact: String(contact),
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

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const rawContact = this.userForm.value.contact || '';
    let sanitizedContact = rawContact.replace(/\D/g, '');

    if (sanitizedContact.startsWith('92')) {
        sanitizedContact = '0' + sanitizedContact.substring(2);
    } else if (!sanitizedContact.startsWith('0') && sanitizedContact.length === 10) {
        sanitizedContact = '0' + sanitizedContact;
    }

    const payload: User = { 
      ...this.userForm.value, 
      contact: sanitizedContact,
      joinedDate: this.user?.joinedDate ?? new Date()
    };

    if (this.user && (this.user.id != null)) {
      // preserve id for edit
      payload.id = this.user.id;
      this.userUpdated.emit(payload);
    } else {
      this.userAdded.emit(payload);
    }
  }
}
