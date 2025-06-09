import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineResultCardComponent } from './timeline-result-card.component';
import { ReportModule } from '../../report.module';

describe('TimelineResultCardComponent', () => {
  let component: TimelineResultCardComponent;
  let fixture: ComponentFixture<TimelineResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelineResultCardComponent ],
      imports: [ReportModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
