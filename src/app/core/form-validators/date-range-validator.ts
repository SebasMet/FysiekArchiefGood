import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(fromControlName: string, toControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const fromDateControl = formGroup.get(fromControlName);
    const toDateControl = formGroup.get(toControlName);

    if (!fromDateControl || !toDateControl) {
      return null;
    }

    const fromDate = fromDateControl.value;
    const toDate = toDateControl.value;

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      if (fromDateControl.hasError('dateOrderInvalid')) {
        fromDateControl.setErrors(null);
      }
      if (toDateControl.hasError('dateOrderInvalid')) {
        toDateControl.setErrors(null);
      }


      if (fromDateObj > toDateObj) {
        toDateControl.setErrors({ ...toDateControl.errors, dateOrderInvalid: true });
        return { dateOrderInvalid: true };
      }
    }
    return null;
  };
}
