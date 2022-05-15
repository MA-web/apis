import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealInquiriesComponent } from './profile-deal-inquiries.component';

describe('ProfileDealInquiriesComponent', () => {
  let component: ProfileDealInquiriesComponent;
  let fixture: ComponentFixture<ProfileDealInquiriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealInquiriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
