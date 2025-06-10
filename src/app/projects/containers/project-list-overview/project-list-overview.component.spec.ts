import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListOverviewComponent } from './project-list-overview.component';
import { ProjectsModule } from '../../projects.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DataService } from '@core/services/data.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ProjectListOverviewComponent', () => {
  let component: ProjectListOverviewComponent;
  let fixture: ComponentFixture<ProjectListOverviewComponent>;
  let dataServiceSpy: jasmine.SpyObj<DataService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dataServiceSpy = jasmine.createSpyObj('DataService', ['getProjects']);
    dataServiceSpy.getProjects.and.returnValue(of([]));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectListOverviewComponent ],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: DataService, useValue: dataServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [ProjectsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    const mockProjects = [
      { generalInformation: { projectName: 'A', projectPeriodFrom: '', projectPeriodTo: '' }, actorInformation: [] }
    ];
    dataServiceSpy.getProjects.and.returnValue(of(mockProjects));
    fixture.detectChanges();
    expect(component.projects).toEqual(mockProjects);
  });

  it('should handle error when loading projects', () => {
    dataServiceSpy.getProjects.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith('Failed to load projects:', jasmine.any(Error));
  });

  it('should navigate to create project page', () => {
    component.navigateToCreateProjectPage();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['projects/create-new']);
  });

  it('should unsubscribe on destroy', () => {
    dataServiceSpy.getProjects.and.returnValue(of([]));
    fixture.detectChanges();
    const spy = spyOn(component['projectsSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
