import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFullCardComponent } from './event-full-card.component';

describe('EventFullCardComponent', () => {
  let component: EventFullCardComponent;
  let fixture: ComponentFixture<EventFullCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFullCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventFullCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
