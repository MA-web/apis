import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFullCardComponent } from './new-full-card.component';

describe('NewFullCardComponent', () => {
  let component: NewFullCardComponent;
  let fixture: ComponentFixture<NewFullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFullCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
