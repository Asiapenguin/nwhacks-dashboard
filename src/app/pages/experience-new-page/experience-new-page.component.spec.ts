import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceNewPageComponent } from './experience-new-page.component';

describe('ExperienceNewPageComponent', () => {
  let component: ExperienceNewPageComponent;
  let fixture: ComponentFixture<ExperienceNewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceNewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceNewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
