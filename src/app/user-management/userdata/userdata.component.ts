import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
// import { UserformComponent } from '../../shared/userform/userform.component';
import { UserService } from '../../services/user.service';
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
      this.loadUsers();
  }
   ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
  loadUsers(): void {
        this.userService.getUsers().subscribe({
            next: (latestUsers) => {
                // The API returns the array directly
                this.users = latestUsers.filter((user: any) => user.is_active === 1);
                console.log('Received new user list from API:', this.users);
            },
            error: (err) => {
                console.error('Failed to load users from API:', err);
                // Handle token expiration / unauthorized status here if necessary
            }
        });
    }
  // src/app/user-management/userdata.component.ts

onDelete(user: User) {
    if (!user.id || !confirm(`Are you sure you want to deactivate user: ${user.first_name}?`)) {
        return;
    }
    
    this.userService.deleteUser(user.id).subscribe({
        next: (response) => {
            console.log('User deactivated successfully:', response);
           const index = this.users.findIndex(u => u.id === user.id);
           if (index !== -1) {
                this.users.splice(index, 1);
            }
        },
        error: (err) => {
            console.error('API Error deactivating user:', err);
            alert(`Deactivation failed: ${err.error?.message || 'Server error'}`);
        }
    });
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
   this.userService.addUser(newUser).subscribe({
        next: (response) => {
            console.log('User added successfully via API:', response);
            // 2. Refresh the list from the backend
            this.loadUsers(); 
            this.closeModal();
        },
        error: (err) => {
            console.error('API Error adding user:', err);
            // Handle and show specific errors (e.g., duplicate email 409)
            alert(`Error adding user: ${err.error?.message || 'Server error'}`);
        }
    });
  }
onUserUpdated(updatedUser: User) {
    if (!this.selectedUser || this.selectedUser.id == null) {
        console.error("Cannot update: selected user or ID is missing.");
        return;
    }
    const userId = this.selectedUser.id; 

    this.userService.editUser(userId, updatedUser).subscribe({
        next: (response) => {
            console.log('User updated successfully via API:', response);
            this.loadUsers(); 
            this.selectedUser = undefined;
            this.closeModal();
        },
        error: (err) => {
            console.error('API Error updating user:', err);
            alert(`Error updating user: ${err.error?.message || 'Server error'}`);
        }
    });
}

   
}
