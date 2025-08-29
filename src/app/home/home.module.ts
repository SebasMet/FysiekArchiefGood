import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// Ng-Icons
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus, heroArrowUpTray, heroArrowDownTray } from '@ng-icons/heroicons/outline';
import { lucideArrowUpDown, lucideChevronDown, lucideEllipsis } from '@ng-icons/lucide';

// Spartan/Helm Brain Modules
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { BrnSelectModule } from '@spartan-ng/brain/select';

// Spartan/Helm UI Modules
import { HlmButtonDirective, HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';

// Components
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { StatusOverviewTableComponent } from './components/status-overview-table/status-overview-table.component';


@NgModule({
  declarations: [
    HomePageComponent,
    SectionHeaderComponent,
    StatusOverviewTableComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    DecimalPipe, 
    TitleCasePipe, 
  ],
  imports: [
    // Angular Modules
    CommonModule,
    FormsModule,
    HttpClientModule,

    // Ng-Icons Module
    NgIconsModule.withIcons({ heroPlus, heroArrowUpTray, heroArrowDownTray, lucideChevronDown, lucideEllipsis, lucideArrowUpDown }),
   
    // Spartan/Helm UI Modules
    HlmButtonModule,
    HlmMenuModule,
    HlmTableModule,
    HlmSelectModule,
    
    // Spartan/Helm Brain Modules
    BrnTableModule,
    BrnSelectModule,

    // Spartan/Helm Directives
    HlmButtonDirective,
    HlmInputDirective,
    HlmIconDirective,
    BrnMenuTriggerDirective,

    // Spartan/Helm Components
    HlmCheckboxComponent,
  ],
})
export class HomeModule { }