import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDealComponent } from './dashboard-deal.component';

describe('DashboardDealComponent', () => {
  let component: DashboardDealComponent;
  let fixture: ComponentFixture<DashboardDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
