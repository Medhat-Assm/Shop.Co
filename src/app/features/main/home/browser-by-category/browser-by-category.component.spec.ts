import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserByCategoryComponent } from './browser-by-category.component';

describe('BrowserByCategoryComponent', () => {
  let component: BrowserByCategoryComponent;
  let fixture: ComponentFixture<BrowserByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserByCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowserByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
