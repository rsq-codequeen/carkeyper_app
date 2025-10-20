import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
// import { UserformComponent } from '../../shared/userform/userform.component';
import { UserService } from '../../services/task.service';
import { Subscription } from 'rxjs';
import { User } from '../user';
// removed ReactiveForms imports
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserformComponent } from '../userform/userform.component';
@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [
    SharedModule,
    UserformComponent,
    CommonModule,
  
    ],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
  selectedUser?: User;
    currentDate = new Date(); 
    users:any[]=[]
    private usersSubscription!: Subscription;
    private userService = inject(UserService);
    // removed userForm
    showModal = false;

    constructor() {}

     ngOnInit(): void {
    // Subscribe to the observable to get the latest list of users
    this.usersSubscription = this.userService.getUsers().subscribe(
      (latestUsers) => {
        this.users = latestUsers;
        console.log('Received new user list:', this.users);
      }
    );
  }
   ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
 
  onDelete(user: any) {
    this.userService.deleteUser(user);
  }
   
  openAddUserModal(){
    this.selectedUser = undefined;
    this.showModal = true;
  }

   openEditModal(user: User) {
    this.selectedUser = user;
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }

  // handler invoked when userform emits created user
  onUserAdded(newUser: any) {
    // Try service addUser, otherwise local fallback
    if (typeof (this.userService as any).addUser === 'function') {
      (this.userService as any).addUser(newUser);
    } else {
      this.users = [newUser, ...this.users];
    }
    this.closeModal();
  }

   onUserUpdated(updatedUser: User) {
    if (this.selectedUser) {
      // call service editUser (task.service has editUser(original, updated))
      if (typeof (this.userService as any).editUser === 'function') {
        (this.userService as any).editUser(this.selectedUser, updatedUser);
      } else {
        // fallback: replace locally by id or reference
        const idx = this.users.findIndex(u => (u.id != null && this.selectedUser?.id != null) ? u.id === this.selectedUser.id : u === this.selectedUser);
        if (idx !== -1) {
          this.users[idx] = { ...updatedUser, id: this.selectedUser.id ?? updatedUser.id };
        }
      }
    }
    this.selectedUser = undefined;
    this.closeModal();
  }

   
}
