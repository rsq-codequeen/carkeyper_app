import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../user';
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
// userdata.component.ts
onUserAdded(newUser: any) {
    const vehicleIdToAssign = newUser.vehicleId; // Extracted from your form payload

    this.userService.addUser(newUser).subscribe({
        next: (response) => {
            // Check if the backend returned the new ID and if we have a vehicle to link
            if (response.userId && vehicleIdToAssign) {
                this.userService.assignVehicle(response.userId, vehicleIdToAssign).subscribe({
                    next: () => this.loadUsers(),
                    error: (err) => console.error("Assignment failed after user creation", err)
                });
            } else {
                this.loadUsers();
            }
            this.closeModal();
        }
    });
}
onUserUpdated(updatedUser: any) {
    const userId = updatedUser.id;
    const vehicleId = updatedUser.vehicleId;

    // 1. Update the user text info
    this.userService.editUser(userId, updatedUser).subscribe({
        next: () => {
            console.log('User info updated');

            // 2. ONLY NOW call the vehicle assignment
            if (vehicleId) {
                this.userService.assignVehicle(userId, vehicleId).subscribe({
                    next: () => {
                        console.log('Vehicle assigned!');
                        this.loadUsers();
                    }
                });
            } else {
                this.loadUsers();
            }
        }
    });
}

   
}
