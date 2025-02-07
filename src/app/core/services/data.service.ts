// src/app/services/data.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage'; // Import AngularFireUploadTask
import { from, Observable, of } from 'rxjs';
import { switchMap, finalize, map, catchError } from 'rxjs/operators';
import { NgZone } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
    private ngZone: NgZone
  ) { }

  public initializeArchiveDocument(uuid: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.ngZone.run(() => {
        this.firestore
          .doc(`files/${uuid}`)
          .set({ initialized: false })
          .then(() => {
            observer.next(true);
            observer.complete();
          })
          .catch((error) => {
            console.error('Error initializing document:', error);
            observer.next(false);
            observer.complete();
          });
      });
    });
  }

  public uploadFile(file: File, uuid: string): Observable<boolean> {
    const filePath = `uploads/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    
    const metadata = {
      customMetadata: {
        'uuid': uuid
      }
    };

    const task = this.storage.upload(filePath, file, metadata);

    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url)
          });
        }),
        map(() => true),
        catchError(() => of(false))
      );
  }
}