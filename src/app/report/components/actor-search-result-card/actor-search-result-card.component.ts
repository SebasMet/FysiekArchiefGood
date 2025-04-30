import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AnalyzedDocument, ActorMentioned } from '@core/types/AnalyzedDocument';
import { Observable, Subscription } from 'rxjs';

export interface GroupedActor {
  actorName: string;
  pages: AnalyzedDocument[];
}

@Component({
  selector: 'app-actor-search-result-card',
  standalone: false,
  templateUrl: './actor-search-result-card.component.html',
  styles: ``
})
export class ActorSearchResultCardComponent   {
  @Input() actorGroupData: GroupedActor | null = null;

  constructor() {}

}
