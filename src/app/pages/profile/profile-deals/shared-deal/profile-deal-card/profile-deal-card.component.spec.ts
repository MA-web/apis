import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealCardComponent } from './profile-deal-card.component';

describe('ProfileDealCardComponent', () => {
  let component: ProfileDealCardComponent;
  let fixture: ComponentFixture<ProfileDealCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
