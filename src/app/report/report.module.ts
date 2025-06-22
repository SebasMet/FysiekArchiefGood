import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportViewComponent } from './containers/report-view/report-view.component';
import { ContextConfirmationCardComponent } from './components/context-confirmation-card/context-confirmation-card.component';
import { MarkdownModule, MARKED_OPTIONS } from 'ngx-markdown';
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
import {
  heroCalendarDays,
  heroUsers,
  heroDocumentText,
  heroExclamationTriangle,
  heroArchiveBox,
  heroClock,
  heroShieldCheck,
} from '@ng-icons/heroicons/outline';
import { ReportOptionsComponent } from './containers/report-options/report-options.component';
import { ActorSearchResultCardComponent } from './components/actor-search-result-card/actor-search-result-card.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/brain/dialog';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { SafeBase64ImagePipe } from '@core/pipes/safe-base64-image.pipe';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { TimelineResultCardComponent } from './components/timeline-result-card/timeline-result-card.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SummaryResultCardComponent } from './components/summary-result-card/summary-result-card.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { FormsModule } from '@angular/forms';
import { HandelingResultHeaderComponent } from './components/handeling-result-header/handeling-result-header.component';
import { HandelingRankingComponent } from './components/handeling-ranking/handeling-ranking.component';
import { HlmBadgeDirective, HlmBadgeModule } from '@spartan-ng/ui-badge-helm';

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
    TimelineResultCardComponent,
    TimelineComponent,
    SummaryResultCardComponent,
    ChatWindowComponent,
    HandelingResultHeaderComponent,
    HandelingRankingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmCheckboxComponent,
    HlmBadgeModule,
    HlmBadgeDirective,
    HlmLabelDirective,
    HlmSpinnerComponent,
    BrnTableModule,
    HlmTableModule,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    SafeBase64ImagePipe,

    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
        },
      },
    }),

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    NgIconsModule.withIcons({ heroDocumentText, heroUsers, heroCalendarDays, heroExclamationTriangle, heroArchiveBox, heroClock, heroShieldCheck }),
  ],
})
export class ReportModule {}