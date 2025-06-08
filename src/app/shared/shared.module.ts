import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { TeamsCardComponent } from './components/teams-card/teams-card.component';
import { HlmAvatarComponent, HlmAvatarFallbackDirective, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmCardDirective, HlmCardContentDirective } from '@spartan-ng/ui-card-helm';



@NgModule({
  declarations: [
    FileUploadComponent,
    TeamsCardComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ heroArrowUpTray}),
    HlmCardDirective,
    HlmCardContentDirective,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,

  ],
  exports: [
    FileUploadComponent,
    TeamsCardComponent,

  ]
})
export class SharedModule { }
