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
import { HlmTableModule } from '@spartan-ng/ui-table-helm';
import { BrnTableModule } from '@spartan-ng/brain/table';
import { NgIconsModule } from '@ng-icons/core';
import { NavigationCardComponent } from './components/navigation-card/navigation-card.component';
import { heroCalendarDays, heroUsers, heroDocumentText } from '@ng-icons/heroicons/outline';
import { ReportOptionsComponent } from './containers/report-options/report-options.component';
import { ActorSearchResultCardComponent } from './components/actor-search-result-card/actor-search-result-card.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component'
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';

// Please note, you must manually Copy node_modules\ng2-pdfjs-viewer\pdfjs to your public or asset folder or use any copy script as part of your build process.
//  Another method could be to use TransferWebpackPlugin if you are using webpack(https://github.com/dkokorev90/transfer-webpack-plugin).



@NgModule({
  declarations: [
    ReportViewComponent,
    ContextConfirmationCardComponent,
    NavigationCardComponent,
    ReportOptionsComponent,
    ActorSearchResultCardComponent,
    PdfViewerComponent,
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
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    NgIconsModule.withIcons({ heroDocumentText, heroUsers, heroCalendarDays}),

  ]
})
export class ReportModule { }
