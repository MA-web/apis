import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealsComponent } from './profile-deals.component';

describe('ProfileDealsComponent', () => {
  let component: ProfileDealsComponent;
  let fixture: ComponentFixture<ProfileDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
