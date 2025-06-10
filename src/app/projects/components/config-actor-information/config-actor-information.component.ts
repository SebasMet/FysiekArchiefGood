import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-actor-information',
  standalone: false,

  templateUrl: './config-actor-information.component.html',
  styles: ``
})
export class ConfigActorInformationComponent {
  public actorListForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.actorListForm = this.fb.group({
      actorEntries: this.fb.array([])
    });
    this.addActor();
  }

  get actorEntries(): FormArray {
    return this.actorListForm.get('actorEntries') as FormArray;
  }

  private createActorEntryGroup(): FormGroup {
    return this.fb.group({
      actorNaam: ['', Validators.required] 
    });
  }

  addActor(): void {
    this.actorEntries.push(this.createActorEntryGroup());
  }

  public getActorsData(): any[] | null {
    if (this.actorListForm.valid) {
      return this.actorEntries.value;
    } else {
      this.actorListForm.markAllAsTouched();
      return null;
    }
  }

}
