import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TerminalComponent } from './terminal/terminal.component';
const routes: Routes = [
  { path: '', component: TerminalComponent }
];

@NgModule({
  declarations: [], // Declare it here
  imports: [
    CommonModule, 
    RouterModule.forChild(routes) // Set up the routing
  ],
  exports: [] // Export it so other modules can use it
})
export class TerminalModule { }