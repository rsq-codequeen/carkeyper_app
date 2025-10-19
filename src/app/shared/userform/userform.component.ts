import { Component, OnInit, inject,Input } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/task.service';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [SharedModule,ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent implements  OnInit {
  @Input() userData: any;
  userDataForm!:FormGroup

  private fb=inject(FormBuilder)
  private userService = inject(UserService);
 
  ngOnInit(): void{
    this.userDataForm=this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required]],
      role:['',Validators.required]
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
      this.userService.editUser(this.userData, this.userDataForm.value);
    } else {
      // Otherwise, we are in add mode
      this.userService.addUser(this.userDataForm.value);
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
  

