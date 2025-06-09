import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConfigComponent } from './project-config.component';
import { ProjectsModule } from '../../projects.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('ProjectConfigComponent', () => {
  let component: ProjectConfigComponent;
  let fixture: ComponentFixture<ProjectConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectConfigComponent ],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient()
      ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
