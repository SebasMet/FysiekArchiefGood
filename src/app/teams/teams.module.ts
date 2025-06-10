import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsOverviewComponent } from './containers/teams-overview/teams-overview.component';
import { NgIconsModule } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TeamsOverviewComponent,
  ],
  imports: [
    CommonModule,
    HlmButtonDirective,
    SharedModule,
    NgIconsModule.withIcons({ heroPlus}),

  ]
})
export class TeamsModule { }
