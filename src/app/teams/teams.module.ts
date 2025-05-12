import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsOverviewComponent } from './containers/teams-overview/teams-overview.component';
import { TeamsCardComponent } from './components/teams-card/teams-card.component';
import { NgIconsModule } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { HlmCardContentDirective, HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmAvatarImageDirective, HlmAvatarComponent, HlmAvatarFallbackDirective } from '@spartan-ng/ui-avatar-helm';



@NgModule({
  declarations: [
    TeamsOverviewComponent,
    TeamsCardComponent
  ],
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardContentDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,
    NgIconsModule.withIcons({ heroPlus}),

  ]
})
export class TeamsModule { }
