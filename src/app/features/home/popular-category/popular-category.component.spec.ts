import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCategoryComponent } from './popular-category.component';

describe('PopularCategoryComponent', () => {
  let component: PopularCategoryComponent;
  let fixture: ComponentFixture<PopularCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCategoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
