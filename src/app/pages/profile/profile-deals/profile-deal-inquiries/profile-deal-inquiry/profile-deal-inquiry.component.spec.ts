import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealInquiryComponent } from './profile-deal-inquiry.component';

describe('ProfileDealInquiryComponent', () => {
  let component: ProfileDealInquiryComponent;
  let fixture: ComponentFixture<ProfileDealInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealInquiryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
