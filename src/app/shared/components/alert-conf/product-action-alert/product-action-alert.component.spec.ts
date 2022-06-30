import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductActionAlertComponent } from './product-action-alert.component';

describe('ProductActionAlertComponent', () => {
  let component: ProductActionAlertComponent;
  let fixture: ComponentFixture<ProductActionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductActionAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductActionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
