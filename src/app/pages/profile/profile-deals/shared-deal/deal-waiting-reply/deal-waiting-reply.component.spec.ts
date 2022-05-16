import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealWaitingReplyComponent } from './deal-waiting-reply.component';

describe('DealWaitingReplyComponent', () => {
  let component: DealWaitingReplyComponent;
  let fixture: ComponentFixture<DealWaitingReplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealWaitingReplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealWaitingReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
