import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigGeneralInformationComponent } from './config-general-information.component';
import { ProjectsModule } from '../../projects.module';
import { By } from '@angular/platform-browser';

describe('ConfigGeneralInformationComponent', () => {
  let component: ConfigGeneralInformationComponent;
  let fixture: ComponentFixture<ConfigGeneralInformationComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ ConfigGeneralInformationComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    // Act
    fixture = TestBed.createComponent(ConfigGeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should show required errors when fields are touched and empty', () => {
    // Arrange
    component.projectName?.markAsTouched();
    component.projectPeriodFrom?.markAsTouched();
    component.projectPeriodTo?.markAsTouched();
    // Act
    fixture.detectChanges();

    const nameError = fixture.debugElement.query(By.css('#projectNameInput + div'));
    const fromError = fixture.debugElement.query(By.css('#projectPeriodFromInput + div'));
    const toError = fixture.debugElement.query(By.css('#projectPeriodToInput + div'));

    // Assert
    expect(nameError.nativeElement.textContent).toContain('Naam Project is vereist');
    expect(fromError.nativeElement.textContent).toContain('Beginddatum is vereist');
    expect(toError.nativeElement.textContent).toContain('Einddatum is vereist');
  });

  it('should show date order error if end date is before start date', () => {
    // Arrange
    component.generalInfoForm.setValue({
      projectName: 'Test',
      projectPeriodFrom: '2024-06-10',
      projectPeriodTo: '2024-06-09'
    });
    component.projectPeriodFrom?.markAsTouched();
    component.projectPeriodTo?.markAsTouched();
    // Act
    fixture.detectChanges();

    const dateOrderError = fixture.debugElement.query(By.css('.text-red-500.text-xs.mt-1:last-child'));
    // Assert
    expect(dateOrderError.nativeElement.textContent).toContain('Einddatum kan niet voor de begindatum liggen');
  });

  it('should return form value if valid', () => {
    // Arrange
    component.generalInfoForm.setValue({
      projectName: 'Test',
      projectPeriodFrom: '2024-06-09',
      projectPeriodTo: '2024-06-10'
    });
    // Act
    fixture.detectChanges();
    // Assert
    expect(component.getFormData()).toEqual({
      projectName: 'Test',
      projectPeriodFrom: '2024-06-09',
      projectPeriodTo: '2024-06-10'
    });
  });
});