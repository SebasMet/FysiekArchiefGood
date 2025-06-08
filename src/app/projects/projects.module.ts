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
import { heroArrowDownTray, heroCog, heroCog6Tooth, heroPlus } from '@ng-icons/heroicons/outline';
import { ConfigSelectionListUploadComponent } from './components/config-selection-list-upload/config-selection-list-upload.component';
import { ProjectListOverviewComponent } from './containers/project-list-overview/project-list-overview.component';
import { ProjectListCardComponent } from './components/project-list-card/project-list-card.component';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardFooterDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { BrnSeparatorComponent } from '@spartan-ng/brain/separator';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { ProjectViewComponent } from './containers/project-view/project-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DossierInfoCardComponent } from './components/dossier-info-card/dossier-info-card.component';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { ProjectUpdateCardComponent } from './components/project-update-card/project-update-card.component';
import { ProjectViewSidebarComponent } from './components/project-view-sidebar/project-view-sidebar.component';


@NgModule({
  declarations: [
    ProjectConfigComponent,
    ConfigGeneralInformationComponent,
    ConfigActorInformationComponent,
    ConfigActorFormComponent,
    ConfigSelectionListUploadComponent,
    ProjectListOverviewComponent,
    ProjectListCardComponent,
    ProjectViewComponent,
    DossierInfoCardComponent,
    ProjectUpdateCardComponent,
    ProjectViewSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HlmInputDirective,
    HlmLabelDirective,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmSeparatorDirective,
    BrnSeparatorComponent,
    NgIconsModule.withIcons({ heroPlus, heroCog6Tooth, heroArrowDownTray }),
    HlmAvatarComponent,
    HlmAvatarImageDirective,
    HlmAvatarFallbackDirective
]
})

export class ProjectsModule { }
