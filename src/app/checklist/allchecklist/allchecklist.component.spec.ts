import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllchecklistComponent } from './allchecklist.component';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ChecklistSummary } from '../checklist';

describe('AllchecklistComponent (Faked)', () => {
  let component: AllchecklistComponent;
  let fixture: ComponentFixture<AllchecklistComponent>;
  
  // 1. Create fakes for the dependencies
  let mockTaskService: any;
  let mockRouter: any;

  const fakeChecklists: ChecklistSummary[] = [
    { template_id: 1, title: 'Morning Check', checklist_time: '08:00', assigned_vehicle: 'Truck-A' },
    { template_id: 2, title: 'Evening Check', checklist_time: '20:00', assigned_vehicle: 'Van-B' }
  ];

  beforeEach(async () => {
    // 2. Initialize the fakes
    mockTaskService = {
      getChecklist: jasmine.createSpy('getChecklist').and.returnValue(of(fakeChecklists)),
      deleteChecklist: jasmine.createSpy('deleteChecklist').and.returnValue(of({}))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      // Notice we use the Standalone component here
      imports: [AllchecklistComponent], 
      providers: [
        { provide: TaskService, useValue: mockTaskService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AllchecklistComponent);
    component = fixture.componentInstance;
  });

  it('should load fake checklists on initialization (ngOnInit)', () => {
    // Trigger ngOnInit
    fixture.detectChanges(); 

    expect(component.checklists.length).toBe(2);
    expect(component.checklists[0].title).toBe('Morning Check');
    expect(mockTaskService.getChecklist).toHaveBeenCalled();
  });

  it('should delete a checklist when user confirms', () => {
    // Fake the browser confirm dialog to return 'true'
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert'); // Fake the alert so it doesn't pop up

    fixture.detectChanges(); // Load initial data
    
    // Call delete on the first item (template_id: 1, index: 0)
    component.onDeleteClick(1, 0);

    expect(mockTaskService.deleteChecklist).toHaveBeenCalledWith(1);
    expect(component.checklists.length).toBe(1); // Array should shrink
    expect(window.alert).toHaveBeenCalledWith('Checklist deleted successfully!');
  });

  it('should NOT delete if user cancels the confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    
    component.onDeleteClick(1, 0);

    expect(mockTaskService.deleteChecklist).not.toHaveBeenCalled();
  });

  it('should navigate to add-checklist page', () => {
    component.navigateToAddChecklist();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/checklist/add-checklist']);
  });
});