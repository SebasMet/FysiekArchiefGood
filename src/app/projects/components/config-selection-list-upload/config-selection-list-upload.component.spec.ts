import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigSelectionListUploadComponent } from './config-selection-list-upload.component';
import { ProjectsModule } from '../../projects.module';

describe('ConfigSelectionListUploadComponent', () => {
  let component: ConfigSelectionListUploadComponent;
  let fixture: ComponentFixture<ConfigSelectionListUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigSelectionListUploadComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigSelectionListUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
