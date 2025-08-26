import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { map, Observable } from 'rxjs';
import { ProjectData } from '@core/models/project.model';

@Component({
  selector: 'app-project-view',
  standalone: false,

  templateUrl: './project-view.component.html',
  styles: ``
})
export class ProjectViewComponent implements OnInit {
  public projectId: string;
  public dossiersInfo$: Observable<any>;
  public projectData$: Observable<ProjectData | null>;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.projectId = params.get('uuid') || '';
      console.log('Project ID:', this.projectId);
      this.loadDossiers();
      this.loadProjectData();
    });
  }

  private loadProjectData() {
    this.projectData$ = this.dataService.getProjectById(this.projectId);
  }

  private loadDossiers() {
    if (!this.projectId) return;

    this.dossiersInfo$ = this.dataService.getDossiersByProjectId(this.projectId).pipe(
      map(dossiers => {
        dossiers.forEach(dossier => {
          this.dataService.getAnalysisVersionsByDossier(dossier.id).subscribe({
            next: (data) => {
              if (data && data.length > 0) {
                console.log('Analysis versions fetched successfully for dossier:', dossier.id);
                dossier.scanCompleted = true;
              } else {
                console.log('No analysis versions found for dossier:', dossier.id);
                dossier.scanCompleted = false;
              }
            },
            error: (error) => {
              console.error('Error fetching analysis versions for dossier:', dossier.id, error);
              dossier.scanCompleted = false;
            },
            complete: () => {
              console.log('Analysis versions fetch completed for dossier:', dossier.id);
            }
          });
        });
        return dossiers;
      })
    )
  }
}
