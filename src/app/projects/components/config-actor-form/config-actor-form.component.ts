import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-config-actor-form',
  standalone: false,

  templateUrl: './config-actor-form.component.html',
  styles: ``
})
export class ConfigActorFormComponent implements OnInit {
  @Input() actor: number = 9999;

  ngOnInit() {
    console.log('Actor', this.actor, 'is initialized')
  }


}
