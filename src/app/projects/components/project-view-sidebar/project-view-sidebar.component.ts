import { Component, Input } from '@angular/core';
import { ProjectData } from '@core/models/project.model';

@Component({
  selector: 'app-project-view-sidebar',
  standalone: false,
  
  templateUrl: './project-view-sidebar.component.html',
  styles: ``
})
export class ProjectViewSidebarComponent {
  @Input() projectData: ProjectData | null;
}
