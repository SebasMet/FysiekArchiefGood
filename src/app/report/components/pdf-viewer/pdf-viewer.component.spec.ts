import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerComponent } from './pdf-viewer.component';
import { ReportModule } from '../../report.module';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComponent;
  let fixture: ComponentFixture<PdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfViewerComponent ],
      imports: [ReportModule],
      providers: [provideHttpClientTesting(),
        provideHttpClient(),
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
