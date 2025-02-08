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
import { TempTableComponent } from './components/temp-table/temp-table.component';
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { TempTableDatesComponent } from './components/temp-table-dates/temp-table-dates.component';



@NgModule({
  declarations: [
    ReportViewComponent,
    ContextConfirmationCardComponent,
    TempTableComponent,
    TempTableDatesComponent
  ],
  imports: [
    CommonModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmInputDirective,
    HlmCheckboxComponent,
    HlmLabelDirective,
    BrnTableModule,
    HlmTableModule,
  ]
})
export class ReportModule { }
