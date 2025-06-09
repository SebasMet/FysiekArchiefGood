import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListOverviewComponent } from './project-list-overview.component';
import { ProjectsModule } from '../../projects.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectListOverviewComponent', () => {
  let component: ProjectListOverviewComponent;
  let fixture: ComponentFixture<ProjectListOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListOverviewComponent ],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient()
      ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
