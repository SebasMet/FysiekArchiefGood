import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-report-options',
  standalone: false,

  templateUrl: './report-options.component.html',
  styleUrl: './report-options.component.css'
})
export class ReportOptionsComponent {

  private _uuid: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this._uuid = this.route.snapshot.paramMap.get('uuid') || '';

  }

  // public async navigateToReport(actor1: string, actor2: string, actor3: string) {
  //   const actors = [actor1, actor2, actor3].filter(Boolean);
  //   if (actors) {
  //     // const response = await this.dataService.createProject()
  //     let response = true
  //     if (!response) {
  //       return;
  //     }
  //     const dossierID = await this.dataService.createDossier(response, this._uuid)
  //     if(!dossierID)
  //       return;
  //     this.dataService.startAnalyze(dossierID)
  //     this.router.navigate(['/report', this._uuid]);

  //   }

  // }

  //this.router.navigate(['/report', this._uuid]);
}


