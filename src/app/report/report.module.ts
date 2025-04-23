import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportViewComponent } from './containers/report-view/report-view.component';
import { ContextConfirmationCardComponent } from './components/context-confirmation-card/context-confirmation-card.component';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { TempTableComponent } from './components/temp-table/temp-table.component';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { TempTableDatesComponent } from './components/temp-table-dates/temp-table-dates.component';
import { NgIconsModule } from '@ng-icons/core';
import { NavigationCardComponent } from './components/navigation-card/navigation-card.component';
import { heroCalendarDays, heroUsers, heroDocumentText } from '@ng-icons/heroicons/outline';
import { ReportOptionsComponent } from './containers/report-options/report-options.component';



@NgModule({
  declarations: [
    ReportViewComponent,
    ContextConfirmationCardComponent,
    TempTableComponent,
    TempTableDatesComponent,
    NavigationCardComponent,
    ReportOptionsComponent,
  ],
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmCheckboxComponent,
    HlmLabelDirective,
    BrnTableModule,
    HlmTableModule,
    NgIconsModule.withIcons({ heroDocumentText, heroUsers, heroCalendarDays}),
    
  ]
})
export class ReportModule { }
