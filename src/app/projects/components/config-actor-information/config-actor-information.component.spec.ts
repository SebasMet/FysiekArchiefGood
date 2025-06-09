import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigActorInformationComponent } from './config-actor-information.component';
import { ProjectsModule } from '../../projects.module';

describe('ConfigActorInformationComponent', () => {
  let component: ConfigActorInformationComponent;
  let fixture: ComponentFixture<ConfigActorInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigActorInformationComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigActorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
