
import { Component, TrackByFunction, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PaginatorState, useBrnColumnManager } from '@spartan-ng/brain/table';
import { debounceTime, map } from 'rxjs';

export type ProcessedArchive = {
  id: string;
  name: string;
  ministry: string;
  assignedEmployee: string;
  status: 'Geaccepteerd' | 'Geweigerd' | 'To be processed';
};

const ARCHIVE_DATA: ProcessedArchive[] = [
  {
    id: 'doc-1001',
    name: 'Aanvraag Subsidie Zonnepanelen',
    ministry: 'Ministerie van Economische Zaken en Klimaat',
    assignedEmployee: 'Jan de Vries',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1002',
    name: 'Bezwaar tegen Bestemmingsplan',
    ministry: 'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties',
    assignedEmployee: 'Karin Bloem',
    status: 'Geweigerd',
  },
  {
    id: 'doc-1003',
    name: 'Vergunningaanvraag Evenement',
    ministry: 'Gemeente Amsterdam',
    assignedEmployee: 'Peter de Groot',
    status: 'To be processed',
  },
  {
    id: 'doc-1004',
    name: 'Aanvraag Woonvergunning',
    ministry: 'Gemeente Utrecht',
    assignedEmployee: 'Sanne Jansen',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1005',
    name: 'Melding Geluidsoverlast',
    ministry: 'Gemeente Rotterdam',
    assignedEmployee: 'Mohammed El Amrani',
    status: 'To be processed',
  },
  {
    id: 'doc-1006',
    name: 'Aanvraag Bouwvergunning Dakkapel',
    ministry: 'Gemeente Den Haag',
    assignedEmployee: 'Fatima Yilmaz',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1007',
    name: 'Bezwaar tegen WOZ-waarde',
    ministry: 'Belastingdienst',
    assignedEmployee: 'Mark van Dijk',
    status: 'Geweigerd',
  },
  {
    id: 'doc-1008',
    name: 'Aanvraag Bijzondere Bijstand',
    ministry: 'Ministerie van Sociale Zaken en Werkgelegenheid',
    assignedEmployee: 'Linda de Jong',
    status: 'To be processed',
  },
  {
    id: 'doc-1009',
    name: 'Verzoek tot Handhaving',
    ministry: 'Gemeente Eindhoven',
    assignedEmployee: 'Chris Peters',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1010',
    name: 'Aanvraag Parkeervergunning',
    ministry: 'Gemeente Groningen',
    assignedEmployee: 'Anna Bakker',
    status: 'To be processed',
  },
  {
    id: 'doc-1011',
    name: 'Klacht over Openbaar Vervoer',
    ministry: 'Ministerie van Infrastructuur en Waterstaat',
    assignedEmployee: 'David Meijer',
    status: 'Geweigerd',
  },
  {
    id: 'doc-1012',
    name: 'Aanvraag Toeristische Vergunning',
    ministry: 'Gemeente Maastricht',
    assignedEmployee: 'Sophie Dubois',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1013',
    name: 'Melding Kapotte Straatverlichting',
    ministry: 'Gemeente Tilburg',
    assignedEmployee: 'Thomas van den Berg',
    status: 'To be processed',
  },
  {
    id: 'doc-1014',
    name: 'Aanvraag Subsidie Verduurzaming',
    ministry: 'Ministerie van Economische Zaken en Klimaat',
    assignedEmployee: 'Emma de Wit',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1015',
    name: 'Bezwaar tegen Gemeentelijke Belastingen',
    ministry: 'Gemeente Nijmegen',
    assignedEmployee: 'Lucas Smit',
    status: 'Geweigerd',
  },
  {
    id: 'doc-1016',
    name: 'Aanvraag Standplaatsvergunning',
    ministry: 'Gemeente Haarlem',
    assignedEmployee: 'Julia Mulder',
    status: 'To be processed',
  },
  {
    id: 'doc-1017',
    name: 'Verzoek tot Informatie (WOB)',
    ministry: 'Ministerie van Algemene Zaken',
    assignedEmployee: 'Noah Visser',
    status: 'Geaccepteerd',
  },
  {
    id: 'doc-1018',
    name: 'Aanvraag Gehandicaptenparkeerkaart',
    ministry: 'Gemeente Arnhem',
    assignedEmployee: 'Eva van Leeuwen',
    status: 'To be processed',
  },
  {
    id: 'doc-1019',
    name: 'Melding Discriminatie',
    ministry: 'Ministerie van Binnenlandse Zaken en Koninkrijksrelaties',
    assignedEmployee: 'Sem de Boer',
    status: 'Geweigerd',
  },
  {
    id: 'doc-1020',
    name: 'Aanvraag Horecavergunning',
    ministry: 'Gemeente Zwolle',
    assignedEmployee: 'Tess de Bruin',
    status: 'Geaccepteerd',
  },
];

@Component({
  selector: 'app-status-overview-table',
  standalone: false,
  templateUrl: './status-overview-table.component.html',
  styleUrl: './status-overview-table.component.css'
})
export class StatusOverviewTableComponent {
  protected readonly _rawFilterInput = signal('');
  protected readonly _nameFilter = signal('');
  private readonly _debouncedFilter = toSignal(toObservable(this._rawFilterInput).pipe(debounceTime(300)));

  private readonly _displayedIndices = signal({ start: 0, end: 0 });
  protected readonly _availablePageSizes = [10, 20, 50, 10000];
  protected readonly _pageSize = signal(this._availablePageSizes[0]);

  protected readonly allDisplayedColumns = [
    'name',
    'ministry',
    'assignedEmployee',
    'status'
  ];

  private readonly _processedArchives = signal(ARCHIVE_DATA);
  private readonly _filteredArchives = computed(() => {
    const nameFilter = this._nameFilter()?.trim()?.toLowerCase();
    if (nameFilter && nameFilter.length > 0) {
      return this._processedArchives().filter((u) => u.name.toLowerCase().includes(nameFilter));
    }
    return this._processedArchives();
  });
  private readonly _ministrySort = signal<'ASC' | 'DESC' | null>(null);
  protected readonly _filteredSortedPaginatedPayments = computed(() => {
    const sort = this._ministrySort();
    const start = this._displayedIndices().start;
    const end = this._displayedIndices().end + 1;
    const archives = this._filteredArchives();
    if (!sort) {
      return archives.slice(start, end);
    }
    return [...archives]
      .sort((p1, p2) => (sort === 'ASC' ? 1 : -1) * p1.ministry.localeCompare(p2.ministry))
      .slice(start, end);
  });

  protected readonly _trackBy: TrackByFunction<ProcessedArchive> = (_: number, p: ProcessedArchive) => p.id;
  protected readonly _totalElements = computed(() => this._filteredArchives().length);
  protected readonly _onStateChange = ({ startIndex, endIndex }: PaginatorState) =>
    this._displayedIndices.set({ start: startIndex, end: endIndex });

  constructor() {
    effect(() => this._nameFilter.set(this._debouncedFilter() ?? ''), { allowSignalWrites: true });
  }


  protected handleMinistirySort() {
    const sort = this._ministrySort();
    if (sort === 'ASC') {
      this._ministrySort.set('DESC');
    } else if (sort === 'DESC') {
      this._ministrySort.set(null);
    } else {
      this._ministrySort.set('ASC');
    }
  }

}
