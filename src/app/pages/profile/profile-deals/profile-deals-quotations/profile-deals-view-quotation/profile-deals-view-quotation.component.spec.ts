import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealsViewQuotationComponent } from './profile-deals-view-quotation.component';

describe('ProfileDealsViewQuotationComponent', () => {
  let component: ProfileDealsViewQuotationComponent;
  let fixture: ComponentFixture<ProfileDealsViewQuotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealsViewQuotationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealsViewQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
