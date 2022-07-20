import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealQuotationComponent } from './profile-deal-quotation.component';

describe('ProfileDealQuotationComponent', () => {
  let component: ProfileDealQuotationComponent;
  let fixture: ComponentFixture<ProfileDealQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
