import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealOrderComponent } from './profile-deal-order.component';

describe('ProfileDealOrderComponent', () => {
  let component: ProfileDealOrderComponent;
  let fixture: ComponentFixture<ProfileDealOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
