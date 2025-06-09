import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListCardComponent } from './project-list-card.component';
import { ProjectsModule } from '../../projects.module';

describe('ProjectListCardComponent', () => {
  let component: ProjectListCardComponent;
  let fixture: ComponentFixture<ProjectListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListCardComponent ],
      imports: [ProjectsModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
