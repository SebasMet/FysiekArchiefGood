import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ConfigGeneralInformationComponent } from '../../components/config-general-information/config-general-information.component';
import { ConfigActorInformationComponent } from '../../components/config-actor-information/config-actor-information.component';
import { DataService } from '@core/services/data.service';
import { ProjectData } from '@core/models/project.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-config',
  standalone: false,

  templateUrl: './project-config.component.html',
  styles: ``
})

export class ProjectConfigComponent   {
  @ViewChild(ConfigGeneralInformationComponent)
  private generalInfoComponent: ConfigGeneralInformationComponent;

  @ViewChild(ConfigActorInformationComponent)
  private actorInfoComponent: ConfigActorInformationComponent;

  constructor(private router: Router, private dataService: DataService) {

  }
  public submitAllForms(): void {

    if (!this.generalInfoComponent || !this.actorInfoComponent) {
      console.error("Child components are not yet available.");
      alert("Forms are not ready. Please try again in a moment.");
      return;
    }


    const generalInfoData = this.generalInfoComponent.getFormData();
    const actorInfoData = this.actorInfoComponent.getActorsData()

    if (generalInfoData && actorInfoData) {

      const projectData: ProjectData = {
        generalInformation: generalInfoData,
        actorInformation: actorInfoData.map(actor => actor.actorNaam)
      };

      this.dataService.createProject(projectData).subscribe({
        next: (response) => {
          console.log('Project created successfully:', response);
          this.router.navigate(['/projects/overview']);
        },
        error: (error) => {
          console.error('Error creating project:', error);
        },
        complete: () => {
          console.log('Project creation process completed.');
        }
      })

    } else {
      console.error('One or more forms are invalid. Please check the highlighted fields.');
    }
  }
}
