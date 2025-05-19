import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-summary-result-card',
  standalone: false,

  templateUrl: './summary-result-card.component.html',
  styles: ``
})
export class SummaryResultCardComponent implements OnChanges {
  @Input() beschrijving: any = {};

  public beschrijvingData: any = {};

    ngOnChanges(changes: SimpleChanges): void {
      console.log('Changes detected:', changes);
      if (changes['beschrijving'] && this.beschrijving?.beschrijving) {
        console.log('dateringen', this.beschrijving?.beschrijving);
        this.beschrijvingData = this.beschrijving?.beschrijving;

      }
    }

}
