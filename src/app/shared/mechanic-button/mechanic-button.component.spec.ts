import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicButtonComponent } from './mechanic-button.component';

describe('MechanicButtonComponent', () => {
  let component: MechanicButtonComponent;
  let fixture: ComponentFixture<MechanicButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MechanicButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MechanicButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
