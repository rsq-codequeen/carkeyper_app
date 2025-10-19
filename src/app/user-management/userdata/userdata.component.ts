import { Component,ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { UserformComponent } from '../../shared/userform/userform.component';
import { UserService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [
    SharedModule,
    UserformComponent,
    CommonModule
    
    ],
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
    currentDate = new Date(); 
    users:any[]=[]
    private usersSubscription!: Subscription;
    private userService = inject(UserService);
    constructor() {}


    @ViewChild(UserformComponent) userformModal!: UserformComponent;
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
   onEdit(user: any) {
    // Pass the user data to the modal component before opening it
    this.userformModal.userData = user;
    this.openUserFormModal();
  }
  openUserFormModal() {
    this.userformModal.open();
  }
   

}
