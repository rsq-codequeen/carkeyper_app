import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverButtonComponent } from './driver-button.component';

describe('DriverButtonComponent', () => {
  let component: DriverButtonComponent;
  let fixture: ComponentFixture<DriverButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
