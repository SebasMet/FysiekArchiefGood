import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRangeValidator } from '@core/form-validators/date-range-validator';


@Component({
  selector: 'app-config-general-information',
  standalone: false,

  templateUrl: './config-general-information.component.html',
  styles: ``,
})
export class ConfigGeneralInformationComponent implements OnInit {
  generalInfoForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.generalInfoForm = this.fb.group({
      projectName: ['', Validators.required],
      projectPeriodFrom: ['', Validators.required],
      projectPeriodTo: ['', Validators.required]
    }, {
      validators: dateRangeValidator('projectPeriodFrom', 'projectPeriodTo') 
    });
  }
  public getFormData(): any | null {
    if (this.generalInfoForm.valid) {
      return this.generalInfoForm.value;
    } else {
      this.generalInfoForm.markAllAsTouched();
      console.warn(
        'Basis informatie form is invalid:',
        this.generalInfoForm.errors
      );
      return null;
    }
  }

  get projectName() {
    return this.generalInfoForm.get('projectName');
  }

  get projectPeriodFrom() {
    return this.generalInfoForm.get('projectPeriodFrom');
  }

  get projectPeriodTo() {
    return this.generalInfoForm.get('projectPeriodTo');
  }
}

