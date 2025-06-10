import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, NO_ERRORS_SCHEMA } from '@angular/core';
import { TimelineResultCardComponent } from './timeline-result-card.component';

describe('TimelineResultCardComponent', () => {
  let component: TimelineResultCardComponent;
  let fixture: ComponentFixture<TimelineResultCardComponent>;
  let nativeElement: HTMLElement;

  const MOCK_DATERINGEN = {
    first_date: { date: '01 JAN 2020', event: 'First Event Occurred' },
    last_date: { date: '31 DEC 2022', event: 'Last Event Occurred' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineResultCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineResultCardComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should display first and last event data when input is provided', () => {
    component.dateringen = MOCK_DATERINGEN;
    component.ngOnChanges({
      dateringen: new SimpleChange(null, component.dateringen, true)
    });
    fixture.detectChanges();

    const dataElements = nativeElement.querySelectorAll('h3.text-muted-foreground');
    
    expect(dataElements[0].textContent?.trim()).toBe(MOCK_DATERINGEN.first_date.date);
    expect(dataElements[1].textContent?.trim()).toBe(MOCK_DATERINGEN.first_date.event);
    expect(dataElements[2].textContent?.trim()).toBe(MOCK_DATERINGEN.last_date.date);
    expect(dataElements[3].textContent?.trim()).toBe(MOCK_DATERINGEN.last_date.event);
  });

  it('should not display event data if input has an invalid structure', () => {
    component.dateringen = { some_other_prop: 'value' }; 
    component.ngOnChanges({
      dateringen: new SimpleChange(null, component.dateringen, true)
    });
    fixture.detectChanges();

    const dataElements = nativeElement.querySelectorAll('h3.text-muted-foreground');

    expect(dataElements[0].textContent?.trim()).toBe('');
    expect(dataElements[1].textContent?.trim()).toBe('');
    expect(dataElements[2].textContent?.trim()).toBe('');
    expect(dataElements[3].textContent?.trim()).toBe('');
  });
});