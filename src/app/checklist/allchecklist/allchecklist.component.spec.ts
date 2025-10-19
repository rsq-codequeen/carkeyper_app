import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllchecklistComponent } from './allchecklist.component';

describe('AllchecklistComponent', () => {
  let component: AllchecklistComponent;
  let fixture: ComponentFixture<AllchecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllchecklistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
