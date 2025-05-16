import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.component.html',
  styles: ``
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  @Input() projectId: string;

  selectedFiles: { pdf: File | null, json: File | null } = { pdf: null, json: null };
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
    const files: FileList = event.target.files;
    this.processFiles(files);
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
      const files: FileList = event.dataTransfer.files;
      this.processFiles(files);
    }
  }

  private processFiles(files: FileList) {
    this.resetState();
    const pdfFile = Array.from(files).find(file => file.type === 'application/pdf');
    const jsonFile = Array.from(files).find(file => file.type === 'application/json');

    if (files.length === 2 && pdfFile && jsonFile) {
      this.selectedFiles.pdf = pdfFile;
      this.selectedFiles.json = jsonFile;
      this.uploadFiles();
    } else {
      this.selectedFiles = { pdf: null, json: null };
      this.uploadError = 'Please select exactly two files: one PDF and one JSON.';
    }
  }


  private async uploadFiles() {
    if (!this.selectedFiles.pdf || !this.selectedFiles.json) {
      this.uploadError = 'Both PDF and JSON files are required.';
      return;
    }

    this.uploadError = null;
    this.uploadSuccess = false;
    this.uploadProgress = 0;

    const uuid = crypto.randomUUID();

    try {
;

      this.dataService.uploadFile(this.selectedFiles.pdf, this.selectedFiles.json, uuid, this.projectId).subscribe({
        next: (dossierUUID) => {
          this.router.navigate(['/report', dossierUUID]);
          this.uploadSuccess = true;
        },
        error: (error) => {
          console.error('Error during file upload:', error);
          this.uploadError = 'An error occurred during file upload.';
        }
      });




    } catch (error) {
      console.error('Error during file upload:', error);
      this.uploadError = 'An error occurred during file upload.';
    }
  }

  resetState() {
    this.selectedFiles = { pdf: null, json: null };
    this.uploadProgress = null;
    this.uploadError = null;
    this.uploadSuccess = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
