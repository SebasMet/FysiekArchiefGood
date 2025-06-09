import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeneralInformationComponent } from './config-general-information.component';
import { ProjectsModule } from '../../projects.module';

describe('ConfigGeneralInformationComponent', () => {
  let component: ConfigGeneralInformationComponent;
  let fixture: ComponentFixture<ConfigGeneralInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigGeneralInformationComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
