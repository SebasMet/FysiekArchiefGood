import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-summary-result-card',
  standalone: false,

  templateUrl: './summary-result-card.component.html',
  styles: ``
})
export class SummaryResultCardComponent implements OnChanges {
  @Input() beschrijving: any = {};

  public beschrijvingData: any = '';
  public beschrijvingContextPages: any[] = [];

    ngOnChanges(changes: SimpleChanges): void {
      console.log('Changes detected:', changes);
      if (changes['beschrijving']) {
        console.log('summary', this.beschrijving.extracted_or_validated_data.beschrijving);
        this.beschrijvingData = this.beschrijving.extracted_or_validated_data.beschrijving;
        this.beschrijvingContextPages = this.beschrijving.extracted_or_validated_data.pages || [];

      }
    }

}
