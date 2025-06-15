import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigActorInformationComponent } from './config-actor-information.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfigActorInformationComponent', () => {
  let component: ConfigActorInformationComponent;
  let fixture: ComponentFixture<ConfigActorInformationComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ConfigActorInformationComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    // Act
    fixture = TestBed.createComponent(ConfigActorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should initialize the form with one actor entry', () => {
    // Assert
    expect(component.actorEntries.length).toBe(1);
    expect(component.actorEntries.at(0).get('actorNaam')).toBeTruthy();
  });

  it('should add a new actor entry when addActor is called', () => {
    // Arrange
    const initialLength = component.actorEntries.length;
    // Act
    component.addActor();
    // Assert
    expect(component.actorEntries.length).toBe(initialLength + 1);
  });

  it('should require actorNaam to be filled', () => {
    // Arrange
    const actorGroup = component.actorEntries.at(0);
    // Act
    actorGroup.get('actorNaam')?.setValue('');
    // Assert
    expect(actorGroup.get('actorNaam')?.valid).toBeFalse();

    // Act
    actorGroup.get('actorNaam')?.setValue('Test Actor');
    // Assert
    expect(actorGroup.get('actorNaam')?.valid).toBeTrue();
  });

  it('should return null from getActorsData if form is invalid', () => {
    // Arrange
    component.actorEntries.at(0).get('actorNaam')?.setValue('');
    // Act
    // Assert
    expect(component.getActorsData()).toBeNull();
  });

  it('should return actors data if form is valid', () => {
    // Arrange
    component.actorEntries.at(0).get('actorNaam')?.setValue('Valid Name');
    // Act
    // Assert
    expect(component.getActorsData()).toEqual([{ actorNaam: 'Valid Name' }]);
  });
});