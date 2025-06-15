import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReportViewComponent } from './report-view.component';
import { DataService } from '@core/services/data.service';

describe('ReportViewComponent', () => {
  let component: ReportViewComponent;
  let fixture: ComponentFixture<ReportViewComponent>;
  let nativeElement: HTMLElement;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  const MOCK_EXISTING_VERSION = { 
    id: 'version-id-123',
    analysis_id: 'analysis-id-abc',
    author: null,
    created_at: new Date().toISOString(),
    version_number: 1, 
    actoren: [{ name: 'Existing Actor' }] as any,
    datering: { first_date: '2023-01-01' } as any,
    beschrijving: { beschrijving: 'Existing description' } as any
  };

  const MOCK_NEW_ANALYSIS_RESULT = { 
    actoren: [{ name: 'New Actor' }],
    datering: { first_date: '2024-01-01' },
    beschrijving: { beschrijving: 'New analysis description' }
  };

  beforeEach(async () => {
    // Arrange
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getAnalysisVersionsByDossier', 'startAnalysis']);
    
    dataServiceSpy.getAnalysisVersionsByDossier.and.returnValue(of([]));
    dataServiceSpy.startAnalysis.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      declarations: [ReportViewComponent],
      providers: [
        { provide: DataService, useValue: dataServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'test-uuid-123' } },
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportViewComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    // Act
    fixture.detectChanges();
    // Assert
    expect(component).toBeTruthy();
  });

  it('should display loading state, then load the latest existing analysis version', fakeAsync(() => {
    // Arrange
    expect(component.initialized).toBeFalse();

    dataServiceSpy.getAnalysisVersionsByDossier.and.returnValue(of([MOCK_EXISTING_VERSION]));
    
    // Act
    fixture.detectChanges();
    
    tick();
    fixture.detectChanges();

    // Assert
    expect(dataServiceSpy.getAnalysisVersionsByDossier).toHaveBeenCalledWith('test-uuid-123');
    expect(dataServiceSpy.startAnalysis).not.toHaveBeenCalled();
    expect(component.initialized).toBeTrue();
    expect(component.actoren).toEqual(MOCK_EXISTING_VERSION.actoren);
    expect(nativeElement.querySelector('app-summary-result-card')).toBeTruthy();
  }));

  it('should start a new analysis if no existing versions are found', fakeAsync(() => {
    // Arrange
    dataServiceSpy.getAnalysisVersionsByDossier.and.returnValue(of([]));
    dataServiceSpy.startAnalysis.and.returnValue(of(MOCK_NEW_ANALYSIS_RESULT));

    // Act
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    // Assert
    expect(dataServiceSpy.getAnalysisVersionsByDossier).toHaveBeenCalledWith('test-uuid-123');
    expect(dataServiceSpy.startAnalysis).toHaveBeenCalledWith('test-uuid-123');
    expect(component.initialized).toBeTrue();
    expect(component.actoren).toEqual(MOCK_NEW_ANALYSIS_RESULT.actoren);
    expect(nativeElement.querySelector('app-summary-result-card')).toBeTruthy();
  }));
});