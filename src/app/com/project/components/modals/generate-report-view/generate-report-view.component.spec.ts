import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReportViewComponent } from './generate-report-view.component';

describe('GenerateReportViewComponent', () => {
  let component: GenerateReportViewComponent;
  let fixture: ComponentFixture<GenerateReportViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateReportViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
