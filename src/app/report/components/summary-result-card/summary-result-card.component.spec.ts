import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange, NO_ERRORS_SCHEMA } from '@angular/core';
import { SummaryResultCardComponent } from './summary-result-card.component';

describe('SummaryResultCardComponent', () => {
  let component: SummaryResultCardComponent;
  let fixture: ComponentFixture<SummaryResultCardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [SummaryResultCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryResultCardComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should display and update the description based on the @Input property', () => {
    // Act
    fixture.detectChanges();
    // Assert
    const descriptionElement = nativeElement.querySelector('h2');
    expect(descriptionElement?.textContent?.trim()).toBe('');

    // Arrange
    const firstDescription = 'Initial description.';
    component.beschrijving = { beschrijving: firstDescription };
    // Act
    component.ngOnChanges({
      beschrijving: new SimpleChange(null, component.beschrijving, true),
    });
    fixture.detectChanges();

    // Assert
    expect(descriptionElement?.textContent?.trim()).toBe(firstDescription);

    // Arrange
    const secondDescription = 'Updated description.';
    const previousValue = component.beschrijving;
    component.beschrijving = { beschrijving: secondDescription };
    // Act
    component.ngOnChanges({
      beschrijving: new SimpleChange(previousValue, component.beschrijving, false),
    });
    fixture.detectChanges();

    // Assert
    expect(descriptionElement?.textContent?.trim()).toBe(secondDescription);
  });

});