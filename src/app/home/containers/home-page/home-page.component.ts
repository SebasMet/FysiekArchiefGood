import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  // Remove the space at the end of the URL
  private functionUrl = 'https://call-openai-cjyhwselka-ez.a.run.app/call_openai';
  responses: Array<{
    loading: boolean;
    data?: any;
    error?: string;
  }> = [];

  constructor(private http: HttpClient) {}

  // callOpenAI(text: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.post(this.functionUrl, { user_input: text }, { headers })
  // }

  // makeMultipleRequests() {
  //   // Initialize responses array with loading states
  //   this.responses = Array(2).fill(null).map(() => ({ loading: true }));

  //   const sampleText = "lieden, de vijf en twintigste februari negentienhonderd drie en tachtig, verschenen voor mij, Henricus Josephus Franciscus Maria Manders, notaris ter standplaats Tilburg: 1.a. de Heer EVERARDUS FRANCISCUS MARIA GROSFELD, directeur R.K. Scholengemeenschap St. Dionysius, wonende te Oisterwijk,• Brede Steeg 4, volgens zijn verklaring handelend als schriftelijk gevolmachtigde van de te TILBURG gevestigde stichting: STICHTING R.K. SCHOLENGEMEENSCHAP ST. DIONYSIUS; b. Mevrouw Drs. FRANCISCA GERDINA LEONARDA JOZEFINA OGG TIEDTKE, medewerkster schoolbegeleidingsdienst, wonende te Dongen, Gaarde 65, volgens haar verklaring handelend als secretaris van het bestuur van voornoemde stichting; de comparanten sub 1.a. en 1.b. in hun gemelde hoedanigheden die stichting vertegenwoordigende. 2. de Heer Mr. JACOBUS MARIA SCHUURKES, juridisch medewerker Katholieke Leergangen, wonende te Tilburg, Wilhelminapark 13a., volgens zijn verklaring handelend als schriftelijk gevolmachtigde van de te TILBURG gevestigde stichting: STICHTING KATHOLIEKE LEERGANGEN, en als zodanig die stichting vertegenwoordigende. 3.a. de Heer CARLO JOSEPHUS HUBERTUS EUGENIUS VON BERGH, notaris, wonende te Tilburg, Romeinenstraat 8; en b. Mevrouw Drs. CLARA MARIA TABORSKY-SCAF, psychologe, wonende te Tilburg, Zwartvenseweg 33; volgens hun verklaring handelend, de sub a. genoemde als voorzitter en de sub b. genoemde als secretaris van het bestuur van de te TILBURG gevestigde stichting: STICHTING KATHOLIEKE SOCIAAL-PEDAGOGISCHE OPLEIDINGEN TILBURG, en als zodanig die stichting vertegenwoordigende. 4.a. de Heer AUGUSTINUS ANTONIUS MARIA DE HAAS, directeur van de hierna te noemen stichting, wonende te Goirle, Tilburgsweg 57, volgens zijn verklaring handelend als schriftelijk gevolmachtigde van de Heer Drs. GODEFRIDUS ANTONIUS GERARDUS COOLEN, rector Theresialyceum, wonende te Moergestel, Tilburgsweg 43, die deze volmacht verstrekt als voorzitter van het bestuur van de te TILBURG gevestigde stichting: STICHTING OPLEIDINGEN GEZONDHEIDSZORG MIDDEN-BRABANT; b. de Heer Drs. CORNELIS ADRIANUS BASTIAANSEN, ziekenhuisdirecteur, wonende te Geldrop, Eversveld 4, volgens zijn verklaring handelend als secretaris van het bestuur van de sub 4.a. genoemde stichting; de comparanten sub 4.a. en 4.b. in hun gemelde hoedanigheden die stichting vertegenwoordigende. De comparanten, overwegende: - dat onder het bestuur van de sub 1. genoemde stichting staat een school voor Middelbaar Huishoud- en Nijverheidsonderwijs (MHNO), genaamd: St. Dionysius; onder het bestuur van de"
  //   // Create an array of 20 identical requests
  //   const requests: Observable<any>[] = Array(2).fill(null).map(() => 
  //     this.callOpenAI(sampleText)
  //   );

  //   // Use forkJoin to execute all requests in parallel
  //   forkJoin(requests).subscribe({
  //     next: (results) => {
  //       this.responses = results.map(result => ({
  //         loading: false,
  //         data: result
  //       })
  //     );
  //       console.log('All responses received:', results);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error);
  //       this.responses = this.responses.map(() => ({
  //         loading: false,
  //         error: error.message || 'An error occurred'
  //       }));
  //     },
  //     complete: () => {
  //       console.log('All requests completed');
  //     }
  //   });
  // }
}