import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryResultCardComponent } from './summary-result-card.component';
import { ReportModule } from '../../report.module';

describe('SummaryResultCardComponent', () => {
  let component: SummaryResultCardComponent;
  let fixture: ComponentFixture<SummaryResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryResultCardComponent ],
      imports: [ReportModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
