import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectConfigComponent } from './project-config.component';
import { ProjectsModule } from '../../projects.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from '@core/services/data.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ProjectConfigComponent', () => {
  let component: ProjectConfigComponent;
  let fixture: ComponentFixture<ProjectConfigComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['createProject']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectConfigComponent ],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [ProjectsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not submit if child components are not available', () => {
    component['generalInfoComponent'] = undefined as any;
    component['actorInfoComponent'] = undefined as any;
    spyOn(window, 'alert');
    component.submitAllForms();
    expect(window.alert).toHaveBeenCalledWith('Forms are not ready. Please try again in a moment.');
  });

  it('should not submit if forms are invalid', () => {
    const generalInfoStub = { getFormData: () => null };
    const actorInfoStub = { getActorsData: () => null };
    component['generalInfoComponent'] = generalInfoStub as any;
    component['actorInfoComponent'] = actorInfoStub as any;
    component.submitAllForms();
    expect(dataServiceSpy.createProject).not.toHaveBeenCalled();
  });

  it('should call dataService.createProject and navigate on success', () => {
    const generalInfoStub = { 
      getFormData: () => ({
        projectName: 'Test Project',
        projectPeriodFrom: '2024-01-01',
        projectPeriodTo: '2024-12-31'
      })
    };
    const actorInfoStub = { getActorsData: () => [{ actorNaam: 'actor1' }, { actorNaam: 'actor2' }] };
    component['generalInfoComponent'] = generalInfoStub as any;
    component['actorInfoComponent'] = actorInfoStub as any;
    dataServiceSpy.createProject.and.returnValue(of('new-id'));

    component.submitAllForms();

    expect(dataServiceSpy.createProject).toHaveBeenCalledWith({
      generalInformation: {
        projectName: 'Test Project',
        projectPeriodFrom: '2024-01-01',
        projectPeriodTo: '2024-12-31'
      },
      actorInformation: ['actor1', 'actor2']
    });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/projects/overview']);
  });

  it('should log error if dataService.createProject errors', () => {
    const generalInfoStub = { 
      getFormData: () => ({
        projectName: 'Test Project',
        projectPeriodFrom: '2024-01-01',
        projectPeriodTo: '2024-12-31'
      })
    };
    const actorInfoStub = { getActorsData: () => [{ actorNaam: 'actor1' }] };
    component['generalInfoComponent'] = generalInfoStub as any;
    component['actorInfoComponent'] = actorInfoStub as any;
    dataServiceSpy.createProject.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');

    component.submitAllForms();

    expect(console.error).toHaveBeenCalledWith('Error creating project:', jasmine.any(Error));
  });
});
