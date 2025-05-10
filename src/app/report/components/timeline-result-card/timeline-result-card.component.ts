import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline-result-card',
  standalone: false,

  templateUrl: './timeline-result-card.component.html',
  styles: ``
})
export class TimelineResultCardComponent {
  public timelineData: any[] = [
    {title: "Eerste Brief", description: "brief naar minister", date: "Mei 1978"},
    {title: "Minister neemt actie", description: "minister stuurt brief terug", date: "Oktober 1978"}
  ]

}
