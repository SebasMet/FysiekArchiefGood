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
  private projectsSubscription: Subscription;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.projectsSubscription = this.dataService.getProjects().subscribe({
      next: (projects: ProjectData[]) => {
        this.projects = projects;
        console.log('Projects loaded:', this.projects);
      },
      error: (err) => {
        console.error('Failed to load projects:', err);

      },
      complete: () => {
        console.log('Project loading completed.');
      }
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
