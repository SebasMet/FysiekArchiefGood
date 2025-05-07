import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectConfigComponent } from './containers/project-config/project-config.component';
import { ConfigGeneralInformationComponent } from './components/config-general-information/config-general-information.component';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { ConfigActorInformationComponent } from './components/config-actor-information/config-actor-information.component';
import { ConfigActorFormComponent } from './components/config-actor-form/config-actor-form.component';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { ConfigSelectionListUploadComponent } from './components/config-selection-list-upload/config-selection-list-upload.component';



@NgModule({
  declarations: [
    ProjectConfigComponent,
    ConfigGeneralInformationComponent,
    ConfigActorInformationComponent,
    ConfigActorFormComponent,
    ConfigSelectionListUploadComponent
  ],
  imports: [
    CommonModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    NgIconsModule.withIcons({heroPlus}),

  ]
})
export class ProjectsModule { }
