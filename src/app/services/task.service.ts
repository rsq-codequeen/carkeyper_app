// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {  ChecklistPayload, ChecklistSummary,ChecklistFullDetails } from '../checklist/checklist';
import { catchError } from 'rxjs/operators';
import { API_URL } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private checklistUrl = `${API_URL}/checklists`;
  


  constructor(private httpClient: HttpClient) {}



  // checklist logic unchanged
  saveChecklist(data: ChecklistPayload): Observable<any> {
        console.log('Sending checklist payload to:', this.checklistUrl, data);
        
        // Return the response object (e.g., { templateId: 101 })
        return this.httpClient.post<any>(this.checklistUrl, data).pipe(
            catchError(error => {
                console.error('API Error: Failed to save checklist.', error);
                // Re-throw the error for the component to handle the alert
                throw error; 
            })
        );
    }

  getChecklist(): Observable<ChecklistSummary[]> {
        console.log('Fetching all checklists from:', this.checklistUrl);

        // We expect ChecklistSummary[] from the API
        return this.httpClient.get<ChecklistSummary[]>(this.checklistUrl).pipe(
             catchError(error => {
                console.error('API Error: Failed to retrieve checklists.', error);
                // On failure, return an empty array to prevent application crash
                return of([]); 
            })
        );
    }
    deleteChecklist(templateId: number): Observable<any> {
        const url = `${this.checklistUrl}/${templateId}`;
        console.log('Deleting checklist:', url);

        return this.httpClient.delete(url).pipe(
            catchError(error => {
                console.error(`API Error: Failed to delete checklist ${templateId}.`, error);
                throw error;
            })
        );
    }
    getChecklistById(templateId: number): Observable<ChecklistFullDetails> {
        const url = `${this.checklistUrl}/${templateId}`;
        console.log('Fetching checklist for edit:', url);
        return this.httpClient.get<ChecklistFullDetails>(url).pipe(
            catchError(error => {
                console.error(`API Error: Failed to retrieve checklist ${templateId}.`, error);
                throw error; 
            })
        );
    }
    updateChecklist(templateId: number, data: ChecklistPayload): Observable<any> {
        const url = `${this.checklistUrl}/${templateId}`;
        console.log(`Sending update payload for ID ${templateId}:`, data);
        
        return this.httpClient.put<any>(url, data).pipe(
            catchError(error => {
                console.error(`API Error: Failed to update checklist ${templateId}.`, error);
                throw error; 
            })
        );
    }

}