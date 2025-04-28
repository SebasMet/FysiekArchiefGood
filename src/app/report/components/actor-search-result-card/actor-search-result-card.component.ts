import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actor-search-result-card',
  standalone: false,
  
  templateUrl: './actor-search-result-card.component.html',
  styles: ``
})
export class ActorSearchResultCardComponent {
  public imageThumbnails: string[] = ['https://placehold.co/400x600','https://placehold.co/400x600','https://placehold.co/400x600']; 
  
  @Input() analyzedResults: any;

}
