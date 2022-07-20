import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealInvoicesComponent } from './profile-deal-invoices.component';

describe('ProfileDealInvoicesComponent', () => {
  let component: ProfileDealInvoicesComponent;
  let fixture: ComponentFixture<ProfileDealInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
