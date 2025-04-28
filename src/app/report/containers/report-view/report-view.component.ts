import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-report-view',
  standalone: false,
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {
  private _uuid: string = '';
  
  importantPeople: string[] = [];
  importantDates: string[] = [];
  isInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._uuid = this.route.snapshot.paramMap.get('uuid') || '';

  }

}