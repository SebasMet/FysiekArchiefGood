import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateCardComponent } from './project-update-card.component';
import { ProjectsModule } from '../../projects.module';

describe('ProjectUpdateCardComponent', () => {
  let component: ProjectUpdateCardComponent;
  let fixture: ComponentFixture<ProjectUpdateCardComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ ProjectUpdateCardComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdateCardComponent);
    component = fixture.componentInstance;
    // Act
    fixture.detectChanges();
  });

  it('should create', () => {
    // Act
    // Already done in beforEeach
    // Assert
    expect(component).toBeTruthy();
  });
});