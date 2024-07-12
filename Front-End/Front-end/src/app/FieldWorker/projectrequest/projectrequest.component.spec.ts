import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectrequestComponent } from './projectrequest.component';

describe('ProjectrequestComponent', () => {
  let component: ProjectrequestComponent;
  let fixture: ComponentFixture<ProjectrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
