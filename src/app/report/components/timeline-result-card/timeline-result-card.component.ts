import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-timeline-result-card',
  standalone: false,
  templateUrl: './timeline-result-card.component.html',
  styles: ``
})
export class TimelineResultCardComponent implements OnChanges {

  @Input() dateringen: any = {};

  public firstDateData: any = {};
  public lastDateData:  any = {};

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    if (changes['dateringen'] && this.dateringen?.first_date) {
      console.log('dateringen', this.dateringen);
      this.firstDateData = this.dateringen.first_date;
      this.lastDateData  = this.dateringen.last_date;
    }
  }
}
