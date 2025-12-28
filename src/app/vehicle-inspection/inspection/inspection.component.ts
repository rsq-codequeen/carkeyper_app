import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { ViewReportComponent } from '../view-report/view-report.component';
import { AttachmentsComponent } from "../attachments/attachments.component";
@Component({
  selector: 'app-inspection',
  standalone: true,
  imports: [SharedModule, CommonModule, NotesComponent, ViewReportComponent, AttachmentsComponent],
  templateUrl: './inspection.component.html',
  styleUrl: './inspection.component.css'
})
export class InspectionComponent {
  activeModal: 'report' | 'notes' | 'attachments' | null = null;
  
  openModal(type: 'report' | 'notes' | 'attachments'): void {
    this.activeModal = type;
  }

  closeModal(): void {
    this.activeModal = null;
  }
}
