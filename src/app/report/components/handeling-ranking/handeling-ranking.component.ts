import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-handeling-ranking',
  standalone: false,
  
  templateUrl: './handeling-ranking.component.html',
  styles: ``
})
export class HandelingRankingComponent {
  expandedRows = new Set<string>();
  selectedHandeling: string | null = null;
  public initalized: boolean = false;
  @Input() handelingen: any | null = null;
  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
      if (changes['handelingen']) {
        this.initalized = true
        console.log('Handelingen:', this.handelingen);
      }
    }

    toggleRowExpansion(handelingId: string) {
    if (this.expandedRows.has(handelingId)) {
      this.expandedRows.delete(handelingId);
    } else {
      this.expandedRows.add(handelingId);
    }
  }

  isRowExpanded(handelingId: string): boolean {
    return this.expandedRows.has(handelingId);
  }

  selectHandeling(handelingId: string, event: Event) {
    event.stopPropagation();
    this.selectedHandeling = this.selectedHandeling === handelingId ? null : handelingId;
  }

  isSelected(handelingId: string): boolean {
    return this.selectedHandeling === handelingId;
  }


}
