import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { AnalyzedDocument, ActorMentioned } from '@core/models/result.model'; // Adjust path if needed
import { map, Observable, Subscription } from 'rxjs';
import { Database } from '@core/types/types';


export interface GroupedActor {
  actorName: string;
  pages: AnalyzedDocument[];
}

export interface ActorenData {
  actoren: {
    name: string;
    activiteiten: string;
    locaties: any[]; 
  }[];
}

@Component({
  selector: 'app-report-view',
  standalone: false,
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css',
})
export class ReportViewComponent {


  public _uuid: string = '';

  public initialized: boolean = false;
  public actoren: any 
  public dateringen: any
  public beschrijving: any
  public handelingen: any

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

ngOnInit(): void {
  this._uuid = this.route.snapshot.paramMap.get('uuid')!;

  this.dataService.getAnalysisVersionsByDossier(this._uuid).pipe(

  map((versions) => {
      if (versions.length === 0) return null;

      return versions.sort((a, b) => b.version_number - a.version_number)[0];
    })

  ).subscribe({
    next: (latest) => {
      console.log('Latest version:', latest);
      if (!latest) {
        this.dataService.startAnalysis(this._uuid).subscribe({
          next: (result) => {
            console.log(result)
            const actorenData = result.actoren as unknown as ActorenData

            this.actoren      = actorenData.actoren;
            this.dateringen   = result.datering;
            this.beschrijving = result.beschrijving;
            this.handelingen = result.handeling

            console.log('Actoren:', this.actoren);
            console.log('Dateringen:', this.dateringen);
            console.log('Beschrijving:', this.beschrijving);
                    

            this.initialized = true;
          }
        });
      } else {
        const actorenData = latest.actoren as unknown as ActorenData

        this.actoren      = actorenData.actoren;
        this.dateringen   = latest.datering;
        this.beschrijving = latest.beschrijving;
        this.handelingen = latest.handeling
        console.log('Actoren:', this.actoren);
        console.log('Dateringen:', this.dateringen);
        console.log('Beschrijving:', this.beschrijving);
        this.initialized = true;
      }
    },
    error: console.error
  });
}
}
