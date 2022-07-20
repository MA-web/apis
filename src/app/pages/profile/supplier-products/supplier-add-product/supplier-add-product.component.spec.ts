import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddProductComponent } from './supplier-add-product.component';

describe('SupplierAddProductComponent', () => {
  let component: SupplierAddProductComponent;
  let fixture: ComponentFixture<SupplierAddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAddProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
