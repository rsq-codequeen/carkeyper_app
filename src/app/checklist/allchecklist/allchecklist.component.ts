// all-checklist.component.ts
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TaskService } from '../../services/task.service';
import { Checklist } from '../checklist';
import { Router } from '@angular/router';


@Component({
  selector: 'app-allchecklist',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './allchecklist.component.html',
  styleUrl: './allchecklist.component.css'
})
export class AllchecklistComponent  implements OnInit{
  checklists: Checklist[] = [];
  constructor(private taskService: TaskService, private router:Router) {}
  ngOnInit(): void {
       this.getChecklists();
  }
  getChecklists():void{
    this.taskService.getChecklist().subscribe(
      (data:Checklist[])=>{
        this.checklists=data
         console.log('Dummy data loaded successfully:', this.checklists);
      },
      (error)=>{
         console.error('Error fetching checklists:', error);
      }

    )
  }
  onDeleteClick(index: number): void {
    this.checklists.splice(index,1);
    console.log("deletinggg")
  }
  navigateToAddChecklist(){
    this.router.navigate(['/checklist/add-checklist'])
  }
}