import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealsQuotationsComponent } from './profile-deals-quotations.component';

describe('ProfileDealsQuotationsComponent', () => {
  let component: ProfileDealsQuotationsComponent;
  let fixture: ComponentFixture<ProfileDealsQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealsQuotationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealsQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
