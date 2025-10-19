
import { Component, OnInit } from '@angular/core';

// Create a counter variable outside the component class
// This ensures the counter is shared across all instances
let uniqueIdCounter = 0;
@Component({
  selector: 'app-multidropdown',
  standalone: true,
  imports: [],
  templateUrl: './multidropdown.component.html',
  styleUrl: './multidropdown.component.css'
})
export class MultidropdownComponent implements OnInit{
   public uniqueId: string="";

  ngOnInit(): void {
    this.uniqueId = `dropdown-search-${uniqueIdCounter++}`;
  }
}
