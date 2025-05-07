import { Component } from '@angular/core';

@Component({
  selector: 'app-config-actor-information',
  standalone: false,

  templateUrl: './config-actor-information.component.html',
  styles: ``
})
export class ConfigActorInformationComponent {
  private index: number = 1

  public actors: number[] = [1]

  public addActor() {
    this.index++
    this.actors.push(this.index)
    this.actors.forEach((actor, index) => {
      console.log('Actor', index, 'is', actor)
    })
  }

}
