import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMonitoringComponent } from './company-monitoring.component';

describe('CompanyMonitoringComponent', () => {
  let component: CompanyMonitoringComponent;
  let fixture: ComponentFixture<CompanyMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
