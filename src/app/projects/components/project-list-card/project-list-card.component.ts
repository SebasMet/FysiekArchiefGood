import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-list-card',
  standalone: false,

  templateUrl: './project-list-card.component.html',
  styles: ``
})
export class ProjectListCardComponent {
  @Input() projectName: string = 'Project Title 1';
  @Input() teamName: string = 'Team Cofee';
  @Input() progress: number = 50.50;

}
