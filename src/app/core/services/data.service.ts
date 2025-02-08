// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'; // Import AngularFireUploadTask
import { from, Observable, of } from 'rxjs';
import { switchMap, finalize, map, catchError } from 'rxjs/operators';
import { NgZone } from '@angular/core';
import {
  Firestore,
  setDoc,
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from '@angular/fire/firestore';
import { ref, Storage, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storage: Storage,
    private firestore: Firestore,
    private ngZone: NgZone
  ) { }

  public initializeArchiveDocument(uuid: string): Observable<boolean> {
    const filesCollection = collection(this.firestore, 'files');
    const docRef = doc(filesCollection, uuid); 
  
    return from(
      setDoc(docRef, { initialized: false }) 
    ).pipe(
      map(() => true), 
      catchError((error) => {
        console.error('Error initializing document:', error);
        return of(false); 
      })
    );
  }

  public uploadFile(file: File, uuid: string): Observable<boolean> {
    const filePath = `uploads/${file.name}`;
    const fileRef = ref(this.storage, filePath);
    
    const metadata = {
      customMetadata: {
        'uuid': uuid
      }
    };

    const task = uploadBytesResumable(fileRef, file, metadata);

    return new Observable<boolean>(observer => {
      task.on('state_changed',
        (snapshot) => {
          // progress updates can be handled here if needed
        },
        (error) => {
          console.error('Upload failed:', error);
          observer.next(false);
          observer.complete();
        },
        () => {
          getDownloadURL(fileRef).then(url => {
            console.log(url);
            observer.next(true);
            observer.complete();
          });
        }
      );
    });
  }
}