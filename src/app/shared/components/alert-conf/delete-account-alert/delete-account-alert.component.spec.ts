import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountAlertComponent } from './delete-account-alert.component';

describe('DeleteAccountAlertComponent', () => {
  let component: DeleteAccountAlertComponent;
  let fixture: ComponentFixture<DeleteAccountAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccountAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAccountAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
