import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temp-table-dates',
  standalone: false,
  
  templateUrl: './temp-table-dates.component.html',
  styleUrl: './temp-table-dates.component.css'
})
export class TempTableDatesComponent {
    @Input() public data: string[] = [];

}
