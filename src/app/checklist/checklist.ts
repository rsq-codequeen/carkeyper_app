export interface Checklist {
    checklistTitle: string;
    checklistTime: string,
    checklistDesc: string;
    assignedVehicle: string;
     
}
export interface ChecklistItem {
    text: string;           
    requires_ok?: number;   // Optional, defaults to 1 (True)
}
export interface ChecklistPayload {
    title: string;
    description: string;
    assigned_vehicle: string;
    checklist_time: string;
    items: ChecklistItem[]; // The array of tasks
}
export interface ChecklistSummary {
    template_id: number; // The unique ID from the database
    title: string;       
    checklist_time: string;
    assigned_vehicle: string;
}
export interface ChecklistFullDetails {
    template_id: number;
    title: string;
    description: string;
    assigned_vehicle: string;
    checklist_time: string;
    
    items: ChecklistItem[]; // Array of the ChecklistItem interface
}