import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-report-view',
  standalone: false,
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent implements OnInit {
  private _uuid: string = '';
  public analyzedResults$: Observable<any>;
  
  importantPeople: string[] = [];
  importantDates: string[] = [];
  isInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    console.log('ReportViewComponent initialized');
    this._uuid = this.route.snapshot.paramMap.get('uuid') || '';
    this.analyzedResults$ = this.dataService.getArchiveAnalyzeResults(this._uuid)
  }

}