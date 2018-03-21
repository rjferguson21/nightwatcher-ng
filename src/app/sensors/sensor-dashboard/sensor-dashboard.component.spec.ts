import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDashboardComponent } from './sensor-dashboard.component';

describe('SensorDashboardComponent', () => {
  let component: SensorDashboardComponent;
  let fixture: ComponentFixture<SensorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
