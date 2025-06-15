import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectViewComponent } from './project-view.component';
import { ProjectsModule } from '../../projects.module';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from '@core/services/data.service';

describe('ProjectViewComponent', () => {
  let component: ProjectViewComponent;
  let fixture: ComponentFixture<ProjectViewComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(async () => {
    // Arrange
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getDossiersByProjectId', 'getAnalysisVersionsByDossier']);

    await TestBed.configureTestingModule({
      declarations: [ProjectViewComponent],
      imports: [ProjectsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => 'test-uuid'
            })
          }
        },
        { provide: DataService, useValue: dataServiceSpy },
        provideHttpClientTesting(),
        provideHttpClient()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should set projectId from route and call loadDossiers', () => {
    // Arrange
    spyOn<any>(component, 'loadDossiers').and.callThrough();
    dataServiceSpy.getDossiersByProjectId.and.returnValue(of([]));
    
    // Act
    fixture.detectChanges();
    
    // Assert
    expect(component.projectId).toBe('test-uuid');
    expect(component['loadDossiers']).toHaveBeenCalled();
  });

  it('should set dossiersInfo$ observable when loadDossiers is called', (done) => {
    // Arrange
    dataServiceSpy.getDossiersByProjectId.and.returnValue(of([{ id: 1, name: 'Dossier 1' }]));
    dataServiceSpy.getAnalysisVersionsByDossier.and.returnValue(of([]));
    component.projectId = 'test-uuid';
    
    // Act
    (component as any).loadDossiers();
    
    // Assert
    expect(dataServiceSpy.getDossiersByProjectId).toHaveBeenCalledWith('test-uuid');
    component.dossiersInfo$.subscribe(data => {
      setTimeout(() => {
        expect(data).toEqual([{ id: 1, name: 'Dossier 1', scanCompleted: false }]);
        done();
      }, 0);
    });
  });

  it('should not call getDossiersByProjectId if projectId is empty', () => {
    // Arrange
    component.projectId = '';
    
    // Act
    (component as any).loadDossiers();
    
    // Assert
    expect(dataServiceSpy.getDossiersByProjectId).not.toHaveBeenCalled();
  });
});
