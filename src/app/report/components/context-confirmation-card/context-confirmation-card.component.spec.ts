import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextConfirmationCardComponent } from './context-confirmation-card.component';
import { ReportModule } from '../../report.module';

describe('ContextConfirmationCardComponent', () => {
  let component: ContextConfirmationCardComponent;
  let fixture: ComponentFixture<ContextConfirmationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContextConfirmationCardComponent ],
      imports: [ReportModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContextConfirmationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
