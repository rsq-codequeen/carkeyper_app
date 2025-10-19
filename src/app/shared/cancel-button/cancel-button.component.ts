import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-cancel-button',
  standalone: true,
  imports: [],
  templateUrl: './cancel-button.component.html',
  styleUrl: './cancel-button.component.css'
})
export class CancelButtonComponent {
    @Input() btn_text:string=''
}
