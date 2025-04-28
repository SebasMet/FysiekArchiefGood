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
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private supabase: SupabaseClient<Database>;
  public _session: AuthSession | null = null

  constructor(private readonly http: HttpClient) {
    this.supabase = createClient<Database>(
      environment.SUPABASE_URL,
      environment.SUPABASE_ANON_KEY
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }



  public async uploadFile(file: File, uuid: string) {
    const response = this.supabase.storage.from('archives').upload(`${file.name}_${uuid}`, file)
    
  }

  public getArchiveAnalyzeResults(uuid: string): Observable<any> {
    // const url = new URL(`${environment.SUPABASE_URL}/storage/v1/object/public/archives/${uuid}`);
    console.log("called")
    const url = `http://localhost:3000/data`
    return this.http.get<any>(url.toString())


  }

  // public async uploadFile(file: File, uuid: string) {
  //   const response = this.supabase.storage.from('archives').upload(`${file.name}_${uuid}`, file)
    
  // }

  //https://www.learnrxjs.io/learn-rxjs/recipes/http-polling
  //https://ui.dev/imperative-vs-declarative-programming


  
  
}

