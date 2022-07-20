import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFillingComponent } from './invoice-filling.component';

describe('InvoiceFillingComponent', () => {
  let component: InvoiceFillingComponent;
  let fixture: ComponentFixture<InvoiceFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
