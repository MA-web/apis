import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDealsListComponent } from './profile-deals-list.component';

describe('ProfileDealsListComponent', () => {
  let component: ProfileDealsListComponent;
  let fixture: ComponentFixture<ProfileDealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileDealsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
