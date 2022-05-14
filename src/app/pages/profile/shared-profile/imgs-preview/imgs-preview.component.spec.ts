import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgsPreviewComponent } from './imgs-preview.component';

describe('ImgsPreviewComponent', () => {
  let component: ImgsPreviewComponent;
  let fixture: ComponentFixture<ImgsPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgsPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
