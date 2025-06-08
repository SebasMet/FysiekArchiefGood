import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dossier-info-card',
  standalone: false,
  templateUrl: './dossier-info-card.component.html',
  styles: ``
})
export class DossierInfoCardComponent implements OnChanges {
  @Input() dossierInfo: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dossierInfo'] && changes['dossierInfo'].currentValue) {
      console.log('Dossier Info Card Component - Data received');
      console.log('Dossier Info:', this.dossierInfo);
    }
  }
}