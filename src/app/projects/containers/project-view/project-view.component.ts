import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-view',
  standalone: false,

  templateUrl: './project-view.component.html',
  styles: ``
})
export class ProjectViewComponent implements OnInit {
  public projectId: string;
  public dossiersInfo$: Observable<any>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('uuid') || '';
      console.log('Project ID:', this.projectId);
      this.loadDossiers();
    });
  }


  private loadDossiers() {
    if (!this.projectId) return;

    this.dossiersInfo$ = this.dataService.getDossiersByProjectId(this.projectId)
  }

}
