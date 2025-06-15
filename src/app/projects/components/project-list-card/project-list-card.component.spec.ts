import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectListCardComponent } from './project-list-card.component';
import { ProjectsModule } from '../../projects.module';
import { Router } from '@angular/router';

describe('ProjectListCardComponent', () => {
  let component: ProjectListCardComponent;
  let fixture: ComponentFixture<ProjectListCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProjectData = {
    projectId: '123',
    generalInformation: {
      projectName: 'Test Project'
    }
  } as any;

  beforeEach(async () => {
    // Arrange
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ ProjectListCardComponent ],
      imports: [ProjectsModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListCardComponent);
    component = fixture.componentInstance;
    component.projectData = mockProjectData;
    // Act
    fixture.detectChanges();
  });

  it('should create', () => {
    // Act
    // Already done in beforEeach
    // Assert
    expect(component).toBeTruthy();
  });

  it('should display the project name', () => {
    // Arrange
    const title = fixture.nativeElement.querySelector('h1');

    // Assert
    expect(title.textContent).toContain('Test Project');
  });

  it('should call navigateToProject and navigate to the correct route', () => {
    // Act
    component.navigateToProject();
    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['projects/project/123']);
  });

  it('should call navigateToProject when button is clicked', () => {
    // Arrange
    spyOn(component, 'navigateToProject');
    const button = fixture.nativeElement.querySelector('button');
    // Act
    button.click();
    // Assert
    expect(component.navigateToProject).toHaveBeenCalled();
  });
});