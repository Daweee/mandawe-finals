import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeFormComponent } from './college-form.component';

describe('CollegeFormComponent', () => {
  let component: CollegeFormComponent;
  let fixture: ComponentFixture<CollegeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeFormComponent]
    });
    fixture = TestBed.createComponent(CollegeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
