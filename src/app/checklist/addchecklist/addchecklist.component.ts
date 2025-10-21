import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { CancelButtonComponent } from "../../shared/cancel-button/cancel-button.component";
import { Checklist } from '../checklist';
import { UserService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addchecklist',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    TextEditorComponent,
    FormsModule,
    CancelButtonComponent,
    HttpClientModule
],
  templateUrl: './addchecklist.component.html',
  styleUrl: './addchecklist.component.css'
})
export class AddchecklistComponent {
 checklist :Checklist={
    checklistTitle:'',
    checklistTime:'',
    checklistDesc:'',
    assignedVehicle:''
 }
  checklistItems: string[] = [];
  editIndex: number | null = null;
  editableContent: string = ''; 
  addItemToList(content: string): void {
  this.checklistItems.push(content);
  }
   onDeleteClick(index: number): void {
    // 🚨 Use the splice() method to remove the item at the given index
    this.checklistItems.splice(index, 1);
    this.editIndex = null; 
    console.log("deleting")
  }
  startEdit(index: number): void {
    this.editIndex = index;
    // 🚨 Extract plain text from the HTML and assign it to the temporary variable
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.checklistItems[index];
    this.editableContent = tempDiv.textContent || tempDiv.innerText || '';
  }
  saveEdit(): void {
    if (this.editIndex !== null) {
      // 🚨 Update the original array item with the new plain text content
      this.checklistItems[this.editIndex] = this.editableContent;
    }
    this.editIndex = null; // Exit edit mode
    console.log("editing")
  }
  resetForm(){
      this.checklist.checklistTitle=''
      this.checklist.checklistDesc=''
      this.checklist.checklistTime=''
      this.checklist.assignedVehicle=''

      this.checklistItems=[]
  }
  constructor (private checklistService:UserService,
                private router: Router 
  ){
  }
  saveChecklistData() {
  if (this.checklist.checklistTitle === '' || this.checklist.checklistTime === '') {
    alert('Please fill title and time');
    return false;
  }
  
  this.checklistService.saveChecklist(this.checklist).subscribe({
    next: (res) => {
      console.log('Data saved successfully:', res);
      alert('Checklist has been saved successfully!');
      this.router.navigate(['checklist/All-checklist']); 
    },
    error: (err) => {
      console.error('Failed to save data:', err);
      // You can add an alert for the user here
      alert('Failed to save checklist. Please try again.');
    }
  });
  return true;
}
}
