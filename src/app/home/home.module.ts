import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { DocumentUploaderComponent } from './components/document-uploader/document-uploader.component';




@NgModule({
  declarations: [
    HomePageComponent,
    SectionHeaderComponent,
    DocumentUploaderComponent
  ],
  imports: [
    CommonModule,
    HlmButtonDirective,
    NgIconsModule.withIcons({ heroPlus, heroArrowUpTray })

],



})
export class HomeModule { }
