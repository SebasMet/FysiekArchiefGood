import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dossier-info-card',
  standalone: false,
  templateUrl: './dossier-info-card.component.html',
  styles: ``
})
export class DossierInfoCardComponent implements OnChanges {
  @Input() dossierInfo: any;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dossierInfo'] && changes['dossierInfo'].currentValue) {
      console.log('Dossier Info Card Component - Data received');
      console.log('Dossier Info:', this.dossierInfo);
    }
  }

  public navigateToReport() {
    this.router.navigate(['/report', this.dossierInfo.id]);
  }
}