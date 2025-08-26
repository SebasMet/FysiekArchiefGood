import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { ProjectData } from '@core/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list-overview',
  standalone: false,

  templateUrl: './project-list-overview.component.html',
  styles: ``
})
export class ProjectListOverviewComponent implements OnInit {
  public projects: ProjectData[] = [];
  public projectStats: { [key: string]: { dossierCount: number; scanPercentage: number } } = {};
  private projectsSubscription: Subscription;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.projectsSubscription = this.dataService.getProjects().subscribe({
      next: (projects: ProjectData[]) => {
        this.projects = projects;
        console.log('Projects loaded:', this.projects);
        projects.forEach(project => {
          if (project.projectId) {
            this.loadProjectStats(project.projectId);
          }
        });
      },
      error: (err) => {
        console.error('Failed to load projects:', err);

      },
      complete: () => {
        console.log('Project loading completed.');
      }
    });
  }

  private loadProjectStats(projectId: string) {
    this.dataService.getDossiersByProjectId(projectId).subscribe(dossiers => {
      const dossierCount = dossiers.length;
      if (dossierCount === 0) {
        this.projectStats[projectId] = { dossierCount: 0, scanPercentage: 0 };
        return;
      }
      
      let scanned = 0;
      let checked = 0;
      
      dossiers.forEach(dossier => {
        this.dataService.getAnalysisVersionsByDossier(dossier.id).subscribe(versions => {
          checked++;
          if (versions && versions.length > 0) {
            scanned++;
          }
          if (checked === dossierCount) {
            this.projectStats[projectId] = {
              dossierCount: dossierCount,
              scanPercentage: Math.round((scanned / dossierCount) * 100)
            };
          }
        });
      });
    });
  }

  public navigateToCreateProjectPage() {
    this.router.navigate(['projects/create-new']);
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }
}
