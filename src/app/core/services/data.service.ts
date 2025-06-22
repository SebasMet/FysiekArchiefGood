import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { Database } from '@core/types/types';
import {
  BehaviorSubject,
  catchError,
  defer,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectData } from '@core/models/project.model';

const test_user = {
  email: 'test@test.com',
  password: 'Password',
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient<Database>;
  public _session: AuthSession | null = null;
  public _UserSession: User;
  public currentFile: File | null = null;

  private analyzeResultSubject = new BehaviorSubject<any>(null);
  public analyzeResult$ = this.analyzeResultSubject.asObservable();

  constructor(private readonly http: HttpClient) {
    this.supabase = createClient<Database>(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY
    );
    this.login();
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

public getAnalysisVersionsByDossier(dossierId: string)  {
  console.log
  return defer(() =>
    from(
      this.supabase
          .from('analysis')
          .select('id')
          .eq('dossier_id', dossierId)
    )
  ).pipe(
    switchMap(({ data: analysisRows, error }) => {
      if (error) {
        throw error;
      }

      const analysisIds = (analysisRows ?? []).map(r => r.id);

      if (!analysisIds.length) {
        return of({ data: [], error: null });
      }

      return from(
        this.supabase
            .from('analysis_versions')
            .select('*')
            .in('analysis_id', analysisIds)
      );
    }),
    map(({ data }) => data ?? []),

    catchError(err => {
      console.error('Error fetching analysis_versions:', err);
      return of([]);
    })
  );
}

  public uploadFile(
    file: File,
    jsonFile: File,
    uuid: string,
    projectId: string
  ) {
    return defer(() =>
      from(
        this.supabase.storage
          .from('archives')
          .upload(`/dossiers/project_${projectId}/${file.name}`, file, {
            upsert: true,
            cacheControl: '3600',
          })
      )
    ).pipe(
      tap(({ error }) => {
        if (error) {
          throw error;
        }
      }),
      switchMap(({ data }) => {
        if (data?.id) {
          this.currentFile = file;
          return this.createDossier(projectId, data.id, jsonFile);
        }
        return of(null);
      }),

      catchError((err) => {
        console.error('smth went wrong uploading the file', err);
        return of(null);
      })
    );
  }

  private createDossier(
    projectId: string,
    storageObjectId: string,
    jsonFile: File
  ): Observable<string | null> {
    return defer(() => from(jsonFile.text())).pipe(
      map((rawText) => {
        try {
          return JSON.parse(rawText);
        } catch (error) {
          console.error('Invalid JSON file', error);
          throw error;
        }
      }),

      switchMap((parsedContent) =>
        from(
          this.supabase
            .from('dossiers')
            .insert({
              project_id: projectId,
              storage_object_id: storageObjectId,
              created_by: this.session?.user.id ?? '',
              content: parsedContent,
            })
            .select('id')
            .single()
        )
      ),
      tap((resp) => {
        if (resp.error) {
          throw resp.error;
        }
        console.log('Dossier created with ID:', resp.data?.id);
      }),
      map((resp) => resp.data?.id ?? null),

      catchError((err) => {
        console.error('Error creating dossier:', err);
        return of(null);
      })
    );
  }

  public getProjects(): Observable<ProjectData[]> {
    return defer(() =>
      this.supabase.from('projects').select(`
        id,
        name,
        period_from,
        period_to,
        actors
      `)
    ).pipe(
      map((response: any) => {
        if (response.error) {
          console.error('Supabase error fetching projects:', response.error);
          return [];
        }
        return (response.data || []).map(
          (item: any) =>
          ({
            generalInformation: {
              projectName: item.name,
              projectPeriodFrom: item.period_from,
              projectPeriodTo: item.period_to,
            },
            actorInformation: item.actors || [],
            projectId: item.id
          } as ProjectData)
        );
      }),
      catchError((error) => {
        console.error('Error fetching projects:', error);
        return of([]);
      })
    );
  }

  public getDossiersByProjectId(projectId: string): Observable<any[]> {
    return defer(() =>
      this.supabase
        .from('dossiers')
        .select('id, created_at, storage_object_id, total_pages')
        .eq('project_id', projectId)
    ).pipe(
      map((response: any) => {
        if (response.error) {
          console.error('Supabase error fetching dossiers:', response.error);
          return [];
        }
        console.log('Fetched dossiers:', response.data);
        return response.data || [];
      }),
      catchError((error) => {
        console.error('Error fetching dossiers:', error);
        return of([]);
      })
    );
  }

  public createProject(projectData: ProjectData): Observable<string | null> {
    const projectDataPayload = {
      actors: projectData.actorInformation,
      created_by: this.session?.user.id ?? '',
      name: projectData.generalInformation.projectName,
      period_from: projectData.generalInformation.projectPeriodFrom,
      period_to: projectData.generalInformation.projectPeriodTo,
    };

    return defer(() =>
      this.supabase
        .from('projects')
        .insert(projectDataPayload)
        .select('id')
        .single()
        .throwOnError()
    ).pipe(
      map((res) => res.data.id),
      catchError((err) => {
        console.error('Error creating project:', err);
        return of(null);
      })
    );
  }

 public startAnalysis(dossierId: string): Observable<any> {

    return new Observable<any>((observer) => {
      console.log('Starting analysis for dossier:', dossierId);
      const channel = this.supabase.channel(`dossier-analysis-${dossierId}`)
        .on('broadcast', { event: 'dossier-analysis' }, async (payload) => {
          const status = payload?.['payload']?.status;
          console.log('status update Dservice', status);

          if (status === 'completed') {
            console.log('Analysis completed for dossier:', dossierId);
            channel.unsubscribe();

            try {
              const { data, error } = await this.fetchLatestAnalysisVersion(dossierId);
              if (error) throw error;

              observer.next(data);
              observer.complete();
            } catch (err) {
              observer.error(err);
            }
          }
        })
        .subscribe();

      // Teardown if caller unsubscribes early
      return () => channel.unsubscribe();
    });
  }


  // public getArchiveAnalyzeResults(uuid: string): Observable<any> {
  //   // const url = new URL(`${environment.SUPABASE_URL}/storage/v1/object/public/archives/${uuid}`);
  //   console.log("called")
  //   const url = `http://localhost:3000/data`
  //   return this.http.get<any>(url.toString())

  // }

private fetchLatestAnalysisVersion(dossierId: string) {
  return this.supabase
    .from('analysis_versions')
    .select('*, analysis!inner(id, dossier_id)')
    .eq('analysis.dossier_id', dossierId)
    .order('version_number', { ascending: false })
    .limit(1)
    .maybeSingle();
}

  private async login() {
    const session = await this.supabase.auth.signInWithPassword({
      ...test_user,
    });
    if (session.error) {
      throw new Error('Failed to generate access token', {
        cause: session.error,
      });
    } else {
      this._session = session.data.session;
      console.log('pogchamp');
      console.log(session.data.user.id);
    }
  }

  // public async uploadFile(file: File, uuid: string) {
  //   const response = this.supabase.storage.from('archives').upload(`${file.name}_${uuid}`, file)

  // }

  //https://www.learnrxjs.io/learn-rxjs/recipes/http-polling
  //https://ui.dev/imperative-vs-declarative-programming
}
