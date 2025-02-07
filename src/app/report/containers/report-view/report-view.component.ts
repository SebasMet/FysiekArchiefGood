import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

interface DocumentData {
  initialized: boolean;
  important_people?: string[];
  important_dates?: string[];
}

@Component({
  selector: 'app-report-view',
  standalone: false,
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css'
})
export class ReportViewComponent {
  private _uuid: string = '';
  private _unsubscribe?: () => void;
  
  importantPeople: string[] = [];
  importantDates: string[] = [];
  isInitialized: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this._uuid = this.route.snapshot.paramMap.get('uuid') || '';
    this.listenToDocument();
  }

  ngOnDestroy(): void {
    // Clean up the listener when component is destroyed
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

  private listenToDocument(): void {
    const docRef = doc(this.firestore, 'files', this._uuid);
    
    this._unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data() as DocumentData;
      
      if (data) {
        this.isInitialized = data.initialized;
        
        if (data.initialized) {
          this.importantPeople = data.important_people || [];
          this.importantDates = data.important_dates || [];
          console.log('Important People:', this.importantPeople);
          console.log('Important Dates:', this.importantDates);
        }
      }
    });
  }
}