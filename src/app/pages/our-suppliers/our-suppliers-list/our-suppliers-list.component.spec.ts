import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurSuppliersListComponent } from './our-suppliers-list.component';

describe('OurSuppliersListComponent', () => {
  let component: OurSuppliersListComponent;
  let fixture: ComponentFixture<OurSuppliersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurSuppliersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OurSuppliersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
