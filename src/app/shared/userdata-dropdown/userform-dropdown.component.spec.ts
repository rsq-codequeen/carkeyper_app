import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserformDropdownComponent } from './userform-dropdown.component';

describe('UserformDropdownComponent', () => {
  let component: UserformDropdownComponent;
  let fixture: ComponentFixture<UserformDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserformDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserformDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
