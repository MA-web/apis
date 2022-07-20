import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealInvoiceComponent } from './profile-deal-invoice.component';

describe('ProfileDealInvoiceComponent', () => {
  let component: ProfileDealInvoiceComponent;
  let fixture: ComponentFixture<ProfileDealInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
