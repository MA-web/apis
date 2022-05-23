import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCardBoxComponent } from './skeleton-card-box.component';

describe('SkeletonCardBoxComponent', () => {
  let component: SkeletonCardBoxComponent;
  let fixture: ComponentFixture<SkeletonCardBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonCardBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonCardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
