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

  openFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      this.uploadFile(); 
    } else {
      this.selectedFile = null;
      this.uploadError = 'Please select a valid PDF file.';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file: File = event.dataTransfer.files[0];
      if (file && file.type === 'application/pdf') {
        this.selectedFile = file;
        this.uploadFile(); 
      } else {
        this.selectedFile = null;
        this.uploadError = 'Please select a valid PDF file.';
      }
    }
  }

  private uploadFile() {
    if (!this.selectedFile) {
      this.uploadError = 'No file selected.';
      return;
    }
  
    this.uploadError = null; 
    this.uploadSuccess = false; 
    this.uploadProgress = 0; 
  
    const uuid = crypto.randomUUID();
  
    this.dataService.uploadFile(this.selectedFile, uuid).pipe(
      switchMap((uploadSuccess) => {
        if (uploadSuccess) {
          return this.dataService.initializeArchiveDocument(uuid);
        } else {
          return of(false); 
        }
      })
    ).subscribe({
      next: (success) => {
        if (success) {
          this.uploadSuccess = true;
          this.router.navigate(['/report', uuid]); 
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
      this.fileInput.nativeElement.value = ''; 
    }
  }
}
