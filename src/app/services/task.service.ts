// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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


  constructor(private httpClient: HttpClient) {}



  // checklist logic unchanged
  saveChecklist(checklist: Checklist): Observable<Checklist> {
    const url = 'http://localhost:8080/checklist';
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