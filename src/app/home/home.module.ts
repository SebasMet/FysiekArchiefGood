import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconDirective } from "../../../libs/ui/ui-icon-helm/src/lib/hlm-icon.directive";
import { HlmIconModule } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';



@NgModule({
  declarations: [
    HomePageComponent,
    SectionHeaderComponent
  ],
  imports: [
    CommonModule,
    HlmButtonDirective,
    HlmIconDirective,
    HlmIconModule
],
providers: [provideIcons({ lucideChevronRight })],


})
export class HomeModule { }
