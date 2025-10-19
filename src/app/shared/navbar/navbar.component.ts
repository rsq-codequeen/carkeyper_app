import { Component,AfterViewInit,Input } from '@angular/core';
import { initTooltips } from 'flowbite';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit{
     @Input() message: string = '';
        
      ngAfterViewInit() {
        if (typeof document !== 'undefined') {
          initTooltips();
        }
      }
}
