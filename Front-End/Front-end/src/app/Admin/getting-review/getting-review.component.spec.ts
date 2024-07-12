import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingReviewComponent } from './getting-review.component';

describe('GettingReviewComponent', () => {
  let component: GettingReviewComponent;
  let fixture: ComponentFixture<GettingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GettingReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GettingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
