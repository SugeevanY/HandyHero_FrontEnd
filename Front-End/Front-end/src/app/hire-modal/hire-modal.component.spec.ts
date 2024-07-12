import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireModalComponent } from './hire-modal.component';

describe('HireModalComponent', () => {
  let component: HireModalComponent;
  let fixture: ComponentFixture<HireModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
