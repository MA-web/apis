import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealOrdersComponent } from './profile-deal-orders.component';

describe('ProfileDealOrdersComponent', () => {
  let component: ProfileDealOrdersComponent;
  let fixture: ComponentFixture<ProfileDealOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
