// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Checklist } from '../checklist/checklist';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user-management/user';

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

  // start with empty list
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private httpClient: HttpClient) {}

  // components subscribe to this
  getUsers(): Observable<User[]> {
    return this.usersSubject.asObservable();
  }

  // add a user and emit updated list
  addUser(user: User) {
    const current = this.usersSubject.value || [];
    const newUser: User = {
      ...user,
      id: user.id ?? Date.now(),
      joinedDate: user.joinedDate ?? new Date()
    };
    this.usersSubject.next([newUser, ...current]);
  }

  // delete a user (by id when available)
  deleteUser(user: User) {
    const current = this.usersSubject.value || [];
    const filtered = current.filter(u =>
      (u.id != null && user.id != null) ? u.id !== user.id : u !== user
    );
    this.usersSubject.next(filtered);
  }

  // replace/edit a user
  editUser(originalUser: User, updatedUser: User) {
    const current = this.usersSubject.value || [];
    const index = current.findIndex(u => (u.id != null && originalUser.id != null) ? u.id === originalUser.id : u === originalUser);
    if (index !== -1) {
      const copy = [...current];
      copy[index] = { ...updatedUser, id: originalUser.id ?? updatedUser.id };
      this.usersSubject.next(copy);
    }
  }

  // checklist logic unchanged
  saveChecklist(checklist: Checklist): Observable<Checklist> {
    const url = 'http://localhost:8000/checklist';
    console.log('Sending request to:', url);
    return this.httpClient.post<Checklist>(url, checklist).pipe(
      catchError(error => {
        console.error('Caught error in pipe:', error);
        return of(checklist);
      })
    );
  }

  getChecklist(): Observable<Checklist[]> {
    try {
      throw new Error('API is down. Using dummy data.');
    } catch (error) {
      console.error('API call failed. Returning dummy data.');
      return of(this.dummyChecklists);
    }
  }
}