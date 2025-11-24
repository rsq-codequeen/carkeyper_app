import { Component ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { FormsModule } from '@angular/forms';
import { CancelButtonComponent } from "../../shared/cancel-button/cancel-button.component";
import { Checklist, ChecklistFullDetails, ChecklistPayload } from '.././checklist'; 
import { TaskService } from '../../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../vehicle-management/vehicle';

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
export class AddchecklistComponent implements OnInit{
  isEditMode: boolean = false; 
    currentTemplateId: number | null = null;
  vehicles: Vehicle[] = [];
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
    this.checklistItems.splice(index, 1);
    this.editIndex = null; 
    console.log("deleting")
  }
  startEdit(index: number): void {
    this.editIndex = index;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = this.checklistItems[index];
    this.editableContent = tempDiv.textContent || tempDiv.innerText || '';
  }
  saveEdit(): void {
    if (this.editIndex !== null) {
      this.checklistItems[this.editIndex] = this.editableContent;
    }
    this.editIndex = null; 
    console.log("editing")
  }
  resetForm(){
      this.checklist.checklistTitle=''
      this.checklist.checklistDesc=''
      this.checklist.checklistTime=''
      this.checklist.assignedVehicle=''

      this.checklistItems=[]
  }
  constructor (private checklistService:TaskService,
                private vehicleService: VehicleService,
                private router: Router ,
                private route: ActivatedRoute
  ){
  }
  ngOnInit(): void {
    this.fetchVehicles();
    this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            if (id) {
                this.isEditMode = true;
                this.currentTemplateId = +id; // Convert string to number
                this.loadChecklistForEdit(this.currentTemplateId); 
            }
        });
  }
  loadChecklistForEdit(id: number): void {
        this.checklistService.getChecklistById(id).subscribe({
            next: (data: ChecklistFullDetails) => {
                // Map the API structure (title, description) back to the form structure (checklistTitle, checklistDesc)
                this.checklist.checklistTitle = data.title;
                this.checklist.checklistDesc = data.description;
                this.checklist.checklistTime = data.checklist_time;
                this.checklist.assignedVehicle = data.assigned_vehicle;
                
                // Map the array of objects back to the simple string array for your template
                this.checklistItems = data.items.map(item => item.text);
                console.log('Checklist data loaded for editing:', data);
            },
            error: (err) => {
                console.error('Failed to load checklist for editing:', err);
                alert('Failed to load checklist data. Returning to list.');
                this.router.navigate(['checklist/All-checklist']);
            }
        });
    }
    
  fetchVehicles(): void {
   
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles = data;
        console.log('Fetched vehicles for dropdown:', this.vehicles);
      },
      error: (err) => {
        console.error('Error fetching vehicles:', err);

      }
    });
  }
 saveChecklistData(): boolean {
        // ... (existing validation) ...

        // 1. Construct the Checklist Payload (structure is the same for POST/PUT)
        const payload: ChecklistPayload = {
            title: this.checklist.checklistTitle.trim(), 
            description: this.checklist.checklistDesc.trim(),
            checklist_time: this.checklist.checklistTime, 
            assigned_vehicle: this.checklist.assignedVehicle,
            items: this.checklistItems
                .filter(itemText => itemText.trim().length > 0)
                .map(itemText => ({
                    text: itemText,
                    requires_ok: 1
                }))
        };
        
        // 2. Determine which service method to call based on mode
        const saveObservable = this.isEditMode && this.currentTemplateId
            ? this.checklistService.updateChecklist(this.currentTemplateId, payload) // ⬅️ PUT call
            : this.checklistService.saveChecklist(payload); // ⬅️ POST call

        // 3. Subscribe to the chosen observable
        saveObservable.subscribe({
            next: (res) => {
                const message = this.isEditMode ? 'Checklist has been updated successfully!' : 'Checklist has been saved successfully!';
                console.log(this.isEditMode ? 'Data updated successfully:' : 'Data saved successfully:', res);
                alert(message);
                this.router.navigate(['checklist/All-checklist']); 
                this.resetForm();
            },
            error: (err) => {
                const errorMsg = err.error?.message || 'Failed to save/update checklist due to a network or server error.';
                console.error('Failed to save/update data:', err);
                alert(`Error: ${errorMsg}`);
            }
        });
        return true;
    }
}
