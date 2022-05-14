import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealDetailsComponent } from './profile-deal-details.component';

describe('ProfileDealDetailsComponent', () => {
  let component: ProfileDealDetailsComponent;
  let fixture: ComponentFixture<ProfileDealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
