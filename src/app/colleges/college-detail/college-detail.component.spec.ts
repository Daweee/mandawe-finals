import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDetailComponent } from './college-detail.component';

describe('CollegeDetailComponent', () => {
  let component: CollegeDetailComponent;
  let fixture: ComponentFixture<CollegeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeDetailComponent]
    });
    fixture = TestBed.createComponent(CollegeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
