// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable ,throwError,of} from 'rxjs';
import { Checklist } from '../checklist/checklist';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

   private dummyChecklists: Checklist[] = [
    {
      checklistTitle: 'Daily Safety Inspection',
      checklistTime: '09:00 AM',
      checklistDesc: 'Routine safety check of all vehicles.',
      assignedVehicle: 'Truck #123'
    },
    {
      checklistTitle: 'Weekly Maintenance',
      checklistTime: '02:00 PM',
      checklistDesc: 'Scheduled maintenance for fleet.',
      assignedVehicle: 'Forklift #45'
    },
    {
      checklistTitle: 'Pre-shift Equipment Check',
      checklistTime: '07:30 AM',
      checklistDesc: 'Verify all equipment is operational.',
      assignedVehicle: 'Tractor #789'
    }
  ];
  private users: any[] = [];
  private usersSubject = new Subject<any[]>();
 

  constructor(private httpClient:HttpClient) {}

  // This method allows components to subscribe to data updates.
  getUsers(): Observable<any[]> {
    return this.usersSubject.asObservable();
  }

  // This method adds a new user and broadcasts the updated list.
  addUser(user: any) {
    this.users.push(user);
    this.usersSubject.next(this.users);
  }
   deleteUser(userToDelete: any) {
    this.users = this.users.filter(user => user !== userToDelete);
    this.usersSubject.next(this.users);
  }
   editUser(originalUser: any, updatedUser: any) {
    const index = this.users.indexOf(originalUser);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.usersSubject.next(this.users);
    }
  }
  
   saveChecklist(checklist: Checklist): Observable<Checklist> {
  const url = 'http://localhost:8000/checklist';
  console.log('Sending request to:', url); // Check if this log appears
  return this.httpClient.post<Checklist>(url, checklist).pipe(
    catchError(error => {
      console.error('Caught error in pipe:', error); // Check if this log appears
      return of(checklist);
    })
  );
}
  getChecklist():Observable<Checklist[]>{
       try {
      // In a real app, this would be an http.get() call
      // For now, we'll throw an error to trigger the catch block
      throw new Error('API is down. Using dummy data.');

      // You can return the dummy data here directly if you don't need the try-catch for now
      // return of(this.dummyChecklists);
    } catch (error) {
      console.error('API call failed. Returning dummy data.');
      // 🚨 Return the dummy data wrapped in an Observable using `of()`
      return of(this.dummyChecklists);
    }
  }

}