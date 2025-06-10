import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateCardComponent } from './project-update-card.component';
import { ProjectsModule } from '../../projects.module';

describe('ProjectUpdateCardComponent', () => {
  let component: ProjectUpdateCardComponent;
  let fixture: ComponentFixture<ProjectUpdateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectUpdateCardComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectUpdateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
