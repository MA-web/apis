import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsDetailsComponent } from './supplier-products-details.component';

describe('SupplierProductsDetailsComponent', () => {
  let component: SupplierProductsDetailsComponent;
  let fixture: ComponentFixture<SupplierProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
