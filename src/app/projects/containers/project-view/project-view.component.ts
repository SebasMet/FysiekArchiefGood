import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-view',
  standalone: false,

  templateUrl: './project-view.component.html',
  styles: ``
})
export class ProjectViewComponent {
  public projectId: string;

  constructor(private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.paramMap.get('uuid') || '';
  }

}
