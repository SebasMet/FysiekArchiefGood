import { Component, Input, OnInit } from '@angular/core';
import { AnalyzedDocument } from '@core/types/AnalyzedDocument';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-actor-search-result-card',
  standalone: false,
  templateUrl: './actor-search-result-card.component.html',
  styles: ``
})
export class ActorSearchResultCardComponent implements OnInit {
  public imageThumbnails: string[] = [];

  @Input() analyzedResults$: Observable<any>; // Expected to be { data: [...] }

  constructor() {}

  ngOnInit(): void {
    this.analyzedResults$.subscribe((results) => {
      if (!results || !Array.isArray(results.data)) {
        return;
      }

      const filtered = results.data.filter((result: AnalyzedDocument) => {
        return result.actors_mentioned?.some((actor: any) => actor.mentioned === true);
      });

      this.imageThumbnails = filtered.slice(0, 3).map((result: any) => {
        return `data:image/png;base64,${result.base64Image}`;
      });

      console.log("Filtered image thumbnails:", this.imageThumbnails);
    });
  }
}
