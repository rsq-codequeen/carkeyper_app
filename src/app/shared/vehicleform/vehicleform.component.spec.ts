import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleformComponent } from './vehicleform.component';

describe('VehicleformComponent', () => {
  let component: VehicleformComponent;
  let fixture: ComponentFixture<VehicleformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
