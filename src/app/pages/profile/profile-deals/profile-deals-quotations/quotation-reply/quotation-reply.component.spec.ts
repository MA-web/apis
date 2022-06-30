import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationReplyComponent } from './quotation-reply.component';

describe('QuotationReplyComponent', () => {
  let component: QuotationReplyComponent;
  let fixture: ComponentFixture<QuotationReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
