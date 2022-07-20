import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductsListComponent } from './supplier-products-list.component';

describe('SupplierProductsListComponent', () => {
  let component: SupplierProductsListComponent;
  let fixture: ComponentFixture<SupplierProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
