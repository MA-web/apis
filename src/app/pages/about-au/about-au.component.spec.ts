import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAuComponent } from './about-au.component';

describe('AboutAuComponent', () => {
  let component: AboutAuComponent;
  let fixture: ComponentFixture<AboutAuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutAuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutAuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
