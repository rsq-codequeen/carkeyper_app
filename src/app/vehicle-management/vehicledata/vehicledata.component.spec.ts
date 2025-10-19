import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledataComponent } from './vehicledata.component';

describe('VehicledataComponent', () => {
  let component: VehicledataComponent;
  let fixture: ComponentFixture<VehicledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicledataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
