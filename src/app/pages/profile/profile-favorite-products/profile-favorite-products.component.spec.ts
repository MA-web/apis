import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavoriteProductsComponent } from './profile-favorite-products.component';

describe('ProfileFavoriteProductsComponent', () => {
  let component: ProfileFavoriteProductsComponent;
  let fixture: ComponentFixture<ProfileFavoriteProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFavoriteProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFavoriteProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
