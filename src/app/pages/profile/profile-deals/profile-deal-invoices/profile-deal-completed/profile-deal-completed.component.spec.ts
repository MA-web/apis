import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealCompletedComponent } from './profile-deal-completed.component';

describe('ProfileDealCompletedComponent', () => {
  let component: ProfileDealCompletedComponent;
  let fixture: ComponentFixture<ProfileDealCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
