import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeVehicleComponent } from './intake-vehicle.component';

describe('IntakeVehicleComponent', () => {
  let component: IntakeVehicleComponent;
  let fixture: ComponentFixture<IntakeVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntakeVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntakeVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
