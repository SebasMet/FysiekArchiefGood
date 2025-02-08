import { Component, Input } from '@angular/core';
import { ProcessedArchive } from '@home/components/status-overview-table/status-overview-table.component';

@Component({
  selector: 'app-temp-table',
  standalone: false,
  
  templateUrl: './temp-table.component.html',
  styleUrl: './temp-table.component.css'
})
export class TempTableComponent {
  @Input() public data: string[] = [];

  

}
