import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFillingComponent } from './order-filling.component';

describe('OrderFillingComponent', () => {
  let component: OrderFillingComponent;
  let fixture: ComponentFixture<OrderFillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
