import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigActorFormComponent } from './config-actor-form.component';
import { ProjectsModule } from '../../projects.module';

describe('ConfigActorFormComponent', () => {
  let component: ConfigActorFormComponent;
  let fixture: ComponentFixture<ConfigActorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigActorFormComponent ],
      imports: [ProjectsModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigActorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
