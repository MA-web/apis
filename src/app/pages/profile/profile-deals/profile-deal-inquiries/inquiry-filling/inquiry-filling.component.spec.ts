import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryFillingComponent } from './inquiry-filling.component';

describe('InquiryFillingComponent', () => {
  let component: InquiryFillingComponent;
  let fixture: ComponentFixture<InquiryFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
