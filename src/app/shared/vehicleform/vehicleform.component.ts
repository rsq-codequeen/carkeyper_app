import { Component, OnInit, inject,Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
@Component({
  selector: 'app-vehicleform',
  standalone: true,
  imports: [SharedModule,ReactiveFormsModule],
  templateUrl: './vehicleform.component.html',
  styleUrl: './vehicleform.component.css'
})
export class VehicleformComponent implements  OnInit{
  @Input() userData: any;
  userDataForm!:FormGroup

  private fb=inject(FormBuilder)
  private userService = inject(VehicleService);

  ngOnInit(): void{
    this.userDataForm=this.fb.group({
      name: ['', [Validators.required]],
      reg: ['', [Validators.required]],
      type: ['', [Validators.required]],
      color:[''],
      make:[''],
      feul:[''],
      transmission:[''],
      model:['']
    })
     if (this.userData) {
    this.userDataForm.patchValue(this.userData);
  }
  }
  // userform.component.ts
      onSubmit() {
  if (this.userDataForm.valid) {
    if (this.userData) {
      // If userData exists, it means we are in edit mode
      this.userService.editVehicle(this.userData, this.userDataForm.value);
    } else {
      // Otherwise, we are in add mode
      this.userService.addVehicle(this.userDataForm.value);
    }
    
    console.log('submitted', this.userDataForm.value);
    this.userDataForm.reset();
  } else {
    this.userDataForm.markAllAsTouched();
  }
}
  public populateForm(user: any) {
  this.userData = user;
  if (this.userDataForm) {
    this.userDataForm.patchValue(this.userData);
  }
}
 // Helper method to get the modal element
  private getModalElement(): HTMLElement | null {
    return document.getElementById('authentication-modal');
  }

  public open() {
    const modalElement = this.getModalElement();
    if (modalElement) {
      modalElement.classList.remove('hidden');
      modalElement.classList.add('flex');
    }
  }

  public close() {
    const modalElement = this.getModalElement();
    if (modalElement) {
      modalElement.classList.remove('flex');
      modalElement.classList.add('hidden');
    }
  }
}
