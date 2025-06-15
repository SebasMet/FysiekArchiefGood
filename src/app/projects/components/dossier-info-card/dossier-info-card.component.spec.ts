// FILE: src/app/projects/components/dossier-info-card/dossier-info-card.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DossierInfoCardComponent } from './dossier-info-card.component';
import { ProjectsModule } from '../../projects.module';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { By } from '@angular/platform-browser';

describe('DossierInfoCardComponent', () => {
  let component: DossierInfoCardComponent;
  let fixture: ComponentFixture<DossierInfoCardComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDataService: jasmine.SpyObj<DataService>;

  const defaultMockDossierInfo = {
    id: 'test-dossier-id-123',
    scanCompleted: false,
    total_pages: 10,
    title: 'Test Dossier',
    dossiernummer: 'DN-001'
  };

  beforeEach(async () => {
    // Arrange
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDataService = jasmine.createSpyObj('DataService', ['someMethodIfUsed']);

    await TestBed.configureTestingModule({
      declarations: [DossierInfoCardComponent],
      imports: [ProjectsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DossierInfoCardComponent);
    component = fixture.componentInstance;
    component.dossierInfo = { ...defaultMockDossierInfo };
    
    // Act
    fixture.detectChanges();
  });

  it('should create the component', () => {
    // Act
    // Already done in beforEeach
    // Assert
    expect(component).toBeTruthy();
  });

  it('should display "Geanalyseerd" when scanCompleted is true', () => {
    // Arrange
    component.dossierInfo.scanCompleted = true;

    // Act
    fixture.detectChanges();
    const statusElement = fixture.debugElement.query(By.css('.p-1.px-3.bg-green-400'));

    // Assert
    expect(statusElement).toBeTruthy();
    expect(statusElement.nativeElement.textContent).toContain('Geanalyseerd');
    const noAnalysisElement = fixture.debugElement.query(By.css('.p-1.px-3.bg-gray-400'));
    expect(noAnalysisElement).toBeNull();
  });

  it('should display "Geen analyse" when scanCompleted is false', () => {
    // Arrange
    component.dossierInfo.scanCompleted = false;

    // Act
    fixture.detectChanges();
    const statusElement = fixture.debugElement.query(By.css('.p-1.px-3.bg-gray-400'));

    // Assert
    expect(statusElement).toBeTruthy();
    expect(statusElement.nativeElement.textContent).toContain('Geen analyse');
    const analyzedElement = fixture.debugElement.query(By.css('.p-1.px-3.bg-green-400'));
    expect(analyzedElement).toBeNull();
  });

  it('should display the correct number of total pages', () => {
    // Arrange
    const testPages = 75;
    component.dossierInfo.total_pages = testPages;

    // Act
    fixture.detectChanges();
    const pagesElement = fixture.debugElement.query(By.css('.text-muted-foreground.text-sm'));

    // Assert
    expect(pagesElement).toBeTruthy();
    expect(pagesElement.nativeElement.textContent).toContain(testPages.toString());
  });

  it('should navigate to the report page when "Bekijk dossier" button is clicked', () => {
    // Arrange
    const expectedDossierId = 'dossier-xyz-789';
    component.dossierInfo.id = expectedDossierId;
    fixture.detectChanges();

    const navigateButton = fixture.debugElement.query(By.css('button[hlmBtn]'));
    
    // Act
    navigateButton.nativeElement.click();

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/report', expectedDossierId]);
  });
});