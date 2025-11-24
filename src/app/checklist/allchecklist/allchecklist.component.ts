// all-checklist.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TaskService } from '../../services/task.service';
import { ChecklistSummary } from '../checklist';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allchecklist',
  standalone: true,
  imports: [CommonModule, SharedModule,RouterLink],
  templateUrl: './allchecklist.component.html',
  styleUrl: './allchecklist.component.css'
})
export class AllchecklistComponent  implements OnInit{
 checklists: ChecklistSummary[] = [];
  constructor(private taskService: TaskService, private router:Router) {}
  ngOnInit(): void {
       this.getChecklists();
  }
  getChecklists():void{
        // The service now returns the correct ChecklistSummary[]
        this.taskService.getChecklist().subscribe(
            (data:ChecklistSummary[])=>{ // ⬅️ Updated Type
                this.checklists=data;
                console.log('Checklists loaded successfully from API:', this.checklists);
            },
            (error)=>{
                console.error('Error fetching checklists:', error);
            }
        )
    }
  onDeleteClick(templateId: number, index: number): void {
        if (!confirm('Are you sure you want to permanently delete this checklist template and all its items?')) {
            return;
        }

        this.taskService.deleteChecklist(templateId).subscribe({
            next: () => {
                console.log(`Checklist ${templateId} deleted successfully.`);
                // Update the local array only if the API call was successful
                this.checklists.splice(index, 1);
                alert('Checklist deleted successfully!');
            },
            error: (err) => {
                console.error(`Error deleting checklist ${templateId}:`, err);
                alert('Failed to delete checklist. Please check the server logs.');
            }
        });
    }
  navigateToAddChecklist(){
    this.router.navigate(['/checklist/add-checklist'])
  }
}