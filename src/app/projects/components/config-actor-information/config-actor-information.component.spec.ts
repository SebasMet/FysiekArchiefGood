import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfigActorInformationComponent } from './config-actor-information.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ConfigActorInformationComponent', () => {
  let component: ConfigActorInformationComponent;
  let fixture: ComponentFixture<ConfigActorInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigActorInformationComponent],
      imports: [ReactiveFormsModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigActorInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with one actor entry', () => {
    expect(component.actorEntries.length).toBe(1);
    expect(component.actorEntries.at(0).get('actorNaam')).toBeTruthy();
  });

  it('should add a new actor entry when addActor is called', () => {
    const initialLength = component.actorEntries.length;
    component.addActor();
    expect(component.actorEntries.length).toBe(initialLength + 1);
  });

  it('should require actorNaam to be filled', () => {
    const actorGroup = component.actorEntries.at(0);
    actorGroup.get('actorNaam')?.setValue('');
    expect(actorGroup.get('actorNaam')?.valid).toBeFalse();

    actorGroup.get('actorNaam')?.setValue('Test Actor');
    expect(actorGroup.get('actorNaam')?.valid).toBeTrue();
  });

  it('should return null from getActorsData if form is invalid', () => {
    // Make the form invalid
    component.actorEntries.at(0).get('actorNaam')?.setValue('');
    expect(component.getActorsData()).toBeNull();
  });

  it('should return actors data if form is valid', () => {
    component.actorEntries.at(0).get('actorNaam')?.setValue('Valid Name');
    expect(component.getActorsData()).toEqual([{ actorNaam: 'Valid Name' }]);
  });
});