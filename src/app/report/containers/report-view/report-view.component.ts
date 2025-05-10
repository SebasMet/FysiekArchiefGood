import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { AnalyzedDocument, ActorMentioned } from '@core/types/AnalyzedDocument'; // Adjust path if needed
import { Observable, Subscription } from 'rxjs';

export interface GroupedActor {
  actorName: string;
  pages: AnalyzedDocument[];
}

@Component({
  selector: 'app-report-view',
  standalone: false,
  templateUrl: './report-view.component.html',
  styleUrl: './report-view.component.css',
})
export class ReportViewComponent {
  // private _uuid: string = '';
  // public analyzedResults$: Observable<
  //   { data: AnalyzedDocument[] } | any | null
  // >;
  // public groupedActorData: GroupedActor[] = [];
  // importantPeople: string[] = [];
  // importantDates: string[] = [];
  // isInitialized: boolean = false;
  // private resultsSubscription: Subscription | null = null;

  // constructor(
  //   private route: ActivatedRoute,
  //   private dataService: DataService
  // ) {}

  // ngOnInit(): void {
  //   console.log('ReportViewComponent initialized');
  //   this._uuid = this.route.snapshot.paramMap.get('uuid') || '';
  //   this.analyzedResults$ = this.dataService.analyzeResult$;
  //   this.resultsSubscription?.unsubscribe();

  //   this.resultsSubscription = this.analyzedResults$.subscribe({
  //     next: (results) => {
  //       this.groupedActorData = [];
  //       this.isInitialized = false;

  //       if (!results || !results.data || !Array.isArray(results.data)) {
  //         console.warn(
  //           'Received invalid or empty results for grouping. Structure:',
  //           results
  //         );
  //         return;
  //       }

  //       // Grouping Logic
  //       const actorPageMap = new Map<string, AnalyzedDocument[]>();
  //       results.data.forEach((doc: AnalyzedDocument) => {
  //         if (doc.actors_mentioned && Array.isArray(doc.actors_mentioned)) {
  //           doc.actors_mentioned.forEach((actor: ActorMentioned) => {
  //             if (actor.mentioned === true) {
  //               const currentActorName = actor.actorName;
  //               const pagesForThisActor = actorPageMap.get(currentActorName);
  //               if (pagesForThisActor) {
  //                 if (!pagesForThisActor.some((p) => p === doc)) {
  //                   pagesForThisActor.push(doc);
  //                 }
  //               } else {
  //                 actorPageMap.set(currentActorName, [doc]);
  //               }
  //             }
  //           });
  //         }
  //       });

  //       // Convert map to array
  //       const groupedArray: GroupedActor[] = [];
  //       actorPageMap.forEach((pages, actorName) => {
  //         groupedArray.push({ actorName: actorName, pages: pages });
  //       });

  //       // Optional sort
  //       // groupedArray.sort((a, b) => a.actorName.localeCompare(b.actorName));

  //       // Update component state
  //       this.groupedActorData = groupedArray;
  //       this.isInitialized = true;

  //       this.groupedActorData.forEach((group) => {
  //         const replacer = (key: string, value: any) =>
  //           key === 'base64Image' ? undefined : value;
  //         console.log(JSON.stringify(group, replacer, 2));
  //       });
  //     },
  //     error: (error) => {
  //       console.error('Error receiving or processing analyzed results:', error);
  //       this.groupedActorData = []; // Reset on error
  //       this.isInitialized = true; // Mark as initialized even on error
  //     },
  //     complete: () => {
  //       // Optional: Logic when the observable completes normally
  //       // console.log("Analyzed results stream completed.");
  //     },
  //   });
  // }

  // ngOnDestroy(): void {
  //   console.log('ReportViewComponent destroyed, unsubscribing...');
  //   this.resultsSubscription?.unsubscribe();
  // }
}
