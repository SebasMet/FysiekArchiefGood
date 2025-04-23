import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-report-options',
  standalone: false,
  
  templateUrl: './report-options.component.html',
  styleUrl: './report-options.component.css'
})
export class ReportOptionsComponent {

  private _uuid: string = '';

  constructor(private router: Router,private route: ActivatedRoute) {
    this._uuid = this.route.snapshot.paramMap.get('uuid') || '';

   }

  public navigateToReport(){
    this.router.navigate(['/report', this._uuid]); 
  }

}
