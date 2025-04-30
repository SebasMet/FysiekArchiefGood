// // src/app/services/data.service.ts
import { Injectable } from '@angular/core';

// import { from, Observable, of } from 'rxjs';
// import { switchMap, finalize, map, catchError } from 'rxjs/operators';
// import { NgZone } from '@angular/core';
// import {
//   Firestore,
//   setDoc,
//   addDoc,
//   collection,
//   getDocs,
//   query,
//   doc,
//   getDoc,
//   updateDoc,
//   arrayUnion,
// } from '@angular/fire/firestore';
// import { ref, Storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
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
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const test_user = {
  email: "test@test.com",
  password: "Password",
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient<Database>;
  public _session: AuthSession | null = null
  public _UserSession: User
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




  //shitcode
  public async uploadFile(file: File, uuid: string) {
    const response = await this.supabase.storage.from('archives').upload(`${file.name}_${uuid}`, file)
    if (response.error) {
      console.error("smth went wrong uploading the ifle")
      return null
    }
    if (response.data.id) {
      this.currentFile = file
      return response.data.id
    }
    return null
  }

  public async createDossier(projectId: string, storageObjectId: string) {
    const response = await this.supabase.from("dossiers").insert({ project_id: projectId, storage_object_id: storageObjectId, created_by: this.session?.user.id ?? '' }).select("id").single()
    if(!response) {
      return;
    }
    return response.data?.id;
  }


  public async createProject(actors: string[]) {
    const response = await this.supabase.from("projects").insert({ actors: actors }).select("id").single();
    if (response.data) {
      return response.data.id
    }
    else {
      return null
    }
  }


  public startAnalyze(dossierId: string): void {
    const url = '/api/process/actors';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      ...(this.session?.access_token && { 'Authorization': `Bearer ${this.session.access_token}` })
    });

    const body = { dossier_id: dossierId };

    this.http.post(url, body, { headers }).subscribe({
      next: (response) => {
        console.log('Result from backend:', JSON.stringify(response));
        this.analyzeResultSubject.next(response); // <-- Push result to BehaviorSubject
      },
      error: (error) => {
        console.error('Error in startAnalyze:', error);
        this.analyzeResultSubject.error(error); // Optional
      }
    });
  }


  // public getArchiveAnalyzeResults(uuid: string): Observable<any> {
  //   // const url = new URL(`${environment.SUPABASE_URL}/storage/v1/object/public/archives/${uuid}`);
  //   console.log("called")
  //   const url = `http://localhost:3000/data`
  //   return this.http.get<any>(url.toString())


  // }

  private async login() {
    const session = await this.supabase.auth.signInWithPassword({
      ...test_user,
    });
    if (session.error) {
      throw new Error("Failed to generate access token", {
        cause: session.error,
      });
    }
    else {
      this._session = session.data.session
      console.log("pogchamp")
      console.log(session.data.user.id)
    }
  }

  // public async uploadFile(file: File, uuid: string) {
  //   const response = this.supabase.storage.from('archives').upload(`${file.name}_${uuid}`, file)

  // }

  //https://www.learnrxjs.io/learn-rxjs/recipes/http-polling
  //https://ui.dev/imperative-vs-declarative-programming




}

