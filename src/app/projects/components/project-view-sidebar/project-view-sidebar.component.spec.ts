import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewSidebarComponent } from './project-view-sidebar.component';
import { ProjectsModule } from '../../projects.module';

describe('ProjectViewSidebarComponent', () => {
  let component: ProjectViewSidebarComponent;
  let fixture: ComponentFixture<ProjectViewSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectViewSidebarComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectViewSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
