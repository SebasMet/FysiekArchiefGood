import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { FileUploadComponent } from './file-upload.component';
import { DataService } from '@core/services/data.service';
import { SharedModule } from '../../shared.module';

// Helper function to create mock files
const createFile = (name: string, type: string): File => {
  const blob = new Blob([''], { type });
  return new File([blob], name, { type });
};

// Helper function to create a mock FileList
const createMockFileList = (files: File[]): FileList => {
  const dataTransfer = new DataTransfer();
  files.forEach(file => dataTransfer.items.add(file));
  return dataTransfer.files;
};


describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['uploadFile']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [SharedModule],
      providers: [
        { provide: DataService, useValue: mockDataService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    component.projectId = 'test-project-id-123';
    
    // We still need to mock the ViewChild
    component.fileInput = {
      nativeElement: {
        click: jasmine.createSpy('click'),
        value: ''
      }
    };
    
    // Set up the dataService mock to return an observable by default
    // to avoid "cannot read property 'subscribe' of undefined" errors.
    mockDataService.uploadFile.and.returnValue(of('default-dossier-uuid'));

    fixture.detectChanges();
  });

  it('should create and be in a clean initial state', () => {
    expect(component).toBeTruthy();
    expect(component.selectedFiles.pdf).toBeNull();
    expect(component.selectedFiles.json).toBeNull();
    expect(component.uploadError).toBeNull();
    expect(component.uploadSuccess).toBeFalse();
  });

  describe('File Selection and Validation (via onFileSelected)', () => {
    it('should set an error if only one file is provided', () => {
      const pdfFile = createFile('test.pdf', 'application/pdf');
      const fileList = createMockFileList([pdfFile]);
      const mockEvent = { target: { files: fileList } };

      component.onFileSelected(mockEvent);

      expect(component.selectedFiles.pdf).toBeNull();
      expect(component.uploadError).toBe('Please select exactly two files: one PDF and one JSON.');
      expect(mockDataService.uploadFile).not.toHaveBeenCalled();
    });

    it('should set an error if two files of the wrong type are provided', () => {
      const pdfFile1 = createFile('test1.pdf', 'application/pdf');
      const pdfFile2 = createFile('test2.pdf', 'application/pdf');
      const fileList = createMockFileList([pdfFile1, pdfFile2]);
      const mockEvent = { target: { files: fileList } };

      component.onFileSelected(mockEvent);

      expect(component.uploadError).toBe('Please select exactly two files: one PDF and one JSON.');
      expect(mockDataService.uploadFile).not.toHaveBeenCalled();
    });

    it('should correctly process valid files and trigger an upload', () => {
      const pdfFile = createFile('report.pdf', 'application/pdf');
      const jsonFile = createFile('data.json', 'application/json');
      const fileList = createMockFileList([pdfFile, jsonFile]);
      const mockEvent = { target: { files: fileList } };

      component.onFileSelected(mockEvent);

      expect(component.uploadError).toBeNull();
      expect(component.selectedFiles.pdf).toBe(pdfFile);
      expect(component.selectedFiles.json).toBe(jsonFile);
      expect(mockDataService.uploadFile).toHaveBeenCalled();
    });
  });

  describe('File Upload Workflow', () => {
    // We can manually set the state for these tests since we're not testing the selection logic here.
    beforeEach(() => {
      component.selectedFiles = {
        pdf: createFile('report.pdf', 'application/pdf'),
        json: createFile('data.json', 'application/json'),
      };
    });

    it('should call dataService, navigate on success, and update component state', () => {
      const mockDossierUUID = 'a1b2-c3d4-e5f6-g7h8';
      mockDataService.uploadFile.and.returnValue(of(mockDossierUUID));
      
      // To test this flow, we trigger the method that calls uploadFile,
      // which in this case is onFileSelected (or onDrop) -> processFiles -> uploadFiles
      const fileList = createMockFileList([component.selectedFiles.pdf!, component.selectedFiles.json!]);
      const mockEvent = { target: { files: fileList } };
      component.onFileSelected(mockEvent);

      expect(mockDataService.uploadFile).toHaveBeenCalledWith(
        component.selectedFiles.pdf!,
        component.selectedFiles.json!,
        jasmine.any(String),
        'test-project-id-123'
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/report', mockDossierUUID]);
      expect(component.uploadSuccess).toBeTrue();
      expect(component.uploadError).toBeNull();
    });

    it('should set an error message and not navigate if the dataService upload fails', () => {
      const errorResponse = { status: 500, message: 'Server Error' };
      mockDataService.uploadFile.and.returnValue(throwError(() => errorResponse));
      
      const fileList = createMockFileList([component.selectedFiles.pdf!, component.selectedFiles.json!]);
      const mockEvent = { target: { files: fileList } };
      component.onFileSelected(mockEvent);
      
      expect(mockDataService.uploadFile).toHaveBeenCalled();
      expect(component.uploadError).toBe('An error occurred during file upload.');
      expect(component.uploadSuccess).toBeFalse();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('should correctly process files provided via the onDrop event', () => {
      const pdfFile = createFile('dropped.pdf', 'application/pdf');
      const jsonFile = createFile('dropped.json', 'application/json');
      const fileList = createMockFileList([pdfFile, jsonFile]);

      const mockDropEvent = {
        preventDefault: jasmine.createSpy('preventDefault'),
        dataTransfer: { files: fileList }
      } as any;
      
      component.onDrop(mockDropEvent);

      expect(mockDropEvent.preventDefault).toHaveBeenCalled();
      expect(component.selectedFiles.pdf).toEqual(pdfFile);
      expect(component.selectedFiles.json).toEqual(jsonFile);
      expect(mockDataService.uploadFile).toHaveBeenCalled();
    });
  });
});