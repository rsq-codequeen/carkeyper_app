import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-attachments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attachments.component.html',
  styleUrl: './attachments.component.css'
})
export class AttachmentsComponent {
   @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
  
    closeModal(): void {
      this.close.emit();
    }
}
