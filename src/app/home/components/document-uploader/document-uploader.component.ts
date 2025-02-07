// src/app/document-uploader/document-uploader.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service'; // Import the DataService
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-document-uploader',
  standalone: false,
  templateUrl: './document-uploader.component.html',
  styleUrls: ['./document-uploader.component.css'],
})
export class DocumentUploaderComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploadError: string | null = null;
  uploadSuccess: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  // Open the file input dialog
  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  // Handle file selection from the input element
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.uploadFile(); // Automatically upload the file
    } else {
      this.selectedFile = null;
      this.uploadError = 'Please select a valid PDF file.';
    }
  }

  // Handle drag-over event to allow file drop
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  // Handle drag-leave event
  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  // Handle the drop event for drag-and-drop file uploads
  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file: File = event.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        this.selectedFile = file;
        this.uploadFile(); // Automatically upload the file
      } else {
        this.selectedFile = null;
        this.uploadError = 'Please select a valid PDF file.';
      }
    }
  }

  // Upload the file using the DataService
  private uploadFile() {
    if (!this.selectedFile) {
      this.uploadError = 'No file selected.';
      return;
    }
  
    this.uploadError = null; // Clear any previous errors
    this.uploadSuccess = false; // Reset success state
    this.uploadProgress = 0; // Reset progress
  
    const uuid = crypto.randomUUID();
  
    // Chain the calls using DataService
    this.dataService.uploadFile(this.selectedFile, uuid).pipe(
      switchMap((uploadSuccess) => {
        if (uploadSuccess) {
          return this.dataService.initializeArchiveDocument(uuid);
        } else {
          return of(false); // If upload failed, skip initializing document
        }
      })
    ).subscribe({
      next: (success) => {
        if (success) {
          this.uploadSuccess = true;
          console.log('File uploaded and document initialized successfully');
        } else {
          this.uploadError = 'File upload or document initialization failed.';
        }
      },
      error: (error) => {
        console.error('Error during upload or initialization:', error);
        this.uploadError = 'An unexpected error occurred.';
      },
    });
  }

  resetState() {
    this.selectedFile = null;
    this.uploadProgress = null;
    this.uploadError = null;
    this.uploadSuccess = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Clear the file input
    }
  }
}
