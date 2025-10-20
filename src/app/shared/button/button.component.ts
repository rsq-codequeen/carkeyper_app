import { Component,Input, Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
   @Input() buttonText:string=''
   @Output() buttonClick = new EventEmitter<void>();
    onClick(): void {
      // This will emit the event regardless of other button logic
      this.buttonClick.emit();
    }
 
}
