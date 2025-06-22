import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-result-card',
  standalone: false,
  templateUrl: './timeline-result-card.component.html',
  styles: ``
})
export class TimelineResultCardComponent implements OnChanges {

  @Input() dateringen: any = {};

  public dateringenData: any = {};
  public initalized: boolean

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', this.dateringen);
    if (changes['dateringen'] && this.dateringen.extracted_or_validated_data) {
      this.dateringenData = this.dateringen.extracted_or_validated_data;
      if (this.dateringenData.events || this.dateringenData.dates) {
        this.dateringenData.first_date = this.dateringenData.events?.[0] || this.dateringenData.dates?.[0];
        this.dateringenData.last_date = this.dateringenData.events?.slice(-1)[0] || this.dateringenData.dates?.slice(-1)[0];
        this.initalized = true
      }
    }
  }
}
