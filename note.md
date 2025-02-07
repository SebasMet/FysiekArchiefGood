User upload document -> Selects options -> Firebase receives document -> Triggers function ->

Okay, let's outline how to achieve this in your Angular application with Firebase. You're on the right track with using Cloud Functions triggered by Firestore. Here's a detailed breakdown and code examples:

**Conceptual Flow:**

1. **Angular Frontend (Upload):**
   - User selects a document (e.g., text file, PDF, etc.) in your Angular app.
   - Angular reads the document's content (likely as text if it's a text-based document, or you might need to handle binary data for other formats).
   - Angular sends this document content to Firestore.  You'll store it in a Firestore document within a specific collection.

2. **Firestore (Document Creation & Trigger):**
   - Firestore receives the new document.
   - A Cloud Function, configured with a Firestore `onCreate` trigger for the relevant collection, is automatically invoked.

3. **Cloud Function (Mutation):**
   - The Cloud Function receives the data of the newly created Firestore document.
   - **Text Extraction (if needed):** If the document is not already plain text, you might need to extract text from it within the Cloud Function (e.g., using libraries for PDF parsing, OCR, etc., depending on the document type).
   - **Text Mutation:** Your Cloud Function performs the desired mutations on the extracted text.
   - **Update Firestore Document:**  The Cloud Function updates the *same* Firestore document with the mutated text.  You can add a new field to store the mutated text or replace the original text field, depending on your needs.

4. **Angular Frontend (Real-time Update):**
   - Your Angular application should be set up to listen for real-time updates to the Firestore document you created.
   - When the Cloud Function updates the document with the mutated text, Firestore sends a real-time update to your Angular app.
   - Angular receives the updated document data and updates the UI to display the mutated text.

**Code Implementation (Illustrative Examples):**

**1. Angular Frontend (Angular Service and Component):**

* **Install Firebase Angular SDK:**
   ```bash
   ng add @angular/fire
   ```
   Make sure you've configured your Firebase project in your Angular app (usually in `environment.ts` and `app.module.ts`).

* **Create an Angular Service (e.g., `document.service.ts`):**

   ```typescript
   import { Injectable } from '@angular/core';
   import { AngularFirestore } from '@angular/fire/firestore';
   import { Observable } from 'rxjs';

   @Injectable({
       providedIn: 'root'
   })
   export class DocumentService {

       constructor(private firestore: AngularFirestore) { }

       uploadDocument(documentText: string): Observable<any> {
           // You can customize the collection name and document structure
           return new Observabl▌