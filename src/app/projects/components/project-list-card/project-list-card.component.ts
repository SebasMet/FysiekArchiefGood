import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectData } from '@core/models/project.model';

@Component({
  selector: 'app-project-list-card',
  standalone: false,

  templateUrl: './project-list-card.component.html',
  styles: ``
})
export class ProjectListCardComponent {
  @Input() projectData: ProjectData;
  @Input() projectStats: { dossierCount: number; scanPercentage: number } | null;

  constructor(private router: Router) {}

  public navigateToProject() {
    this.router.navigate([`projects/project/${this.projectData.projectId}`]);
  }
}
