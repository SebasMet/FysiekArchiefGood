import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { SectionHeaderComponent } from './components/section-header/section-header.component';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { NgIconsModule } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { heroArrowUpTray } from '@ng-icons/heroicons/outline';
import { heroArrowDownTray } from '@ng-icons/heroicons/outline';

import { DocumentUploaderComponent } from './components/document-uploader/document-uploader.component';
import { DocumentStatusOverviewComponent } from './components/document-status-overview/document-status-overview.component';
import { StatusOverviewTableComponent } from './components/status-overview-table/status-overview-table.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, TrackByFunction, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { lucideArrowUpDown, lucideChevronDown, lucideEllipsis } from '@ng-icons/lucide';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/brain/menu';
import { HlmMenuModule } from '@spartan-ng/ui-menu-helm';
import { BrnTableModule, PaginatorState, useBrnColumnManager } from '@spartan-ng/brain/table';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnSelectModule } from '@spartan-ng/brain/select';
import { HlmSelectModule } from '@spartan-ng/ui-select-helm';
import { hlmMuted } from '@spartan-ng/ui-typography-helm';
import { debounceTime, map } from 'rxjs';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';




@NgModule({
  declarations: [
    HomePageComponent,
    SectionHeaderComponent,
    DocumentUploaderComponent,
    DocumentStatusOverviewComponent,
    StatusOverviewTableComponent
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ heroPlus, heroArrowUpTray, heroArrowDownTray, lucideChevronDown, lucideEllipsis, lucideArrowUpDown }),
    FormsModule,
    HttpClientModule,

    DecimalPipe,
    TitleCasePipe,
   
    // Hrm Modules
    HlmMenuModule,
    BrnTableModule,
    HlmTableModule,
    BrnSelectModule,
    HlmSelectModule,
    HlmButtonModule,
    
    // Hlm Directives:
    HlmIconDirective,
    HlmButtonDirective,
    HlmInputDirective,
    BrnMenuTriggerDirective,

    // Hlm Components:
    HlmCheckboxComponent,
],



})
export class HomeModule { }
