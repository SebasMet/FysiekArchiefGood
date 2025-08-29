import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { DataService } from '@core/services/data.service';
import { AnalyzedDocument } from '@core/models/result.model';
import * as pdfjsLib from 'pdfjs-dist';
import {
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist/types/src/display/api';


interface PdfShape {
  page: number;
  type: 'rect';
  coords: [number, number, number, number];
  color?: string;
  lineWidth?: number;
}

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  standalone: false,
})
export class PdfViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pdfCanvas', { static: true })
  pdfCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('overlayCanvas', { static: true })
  overlayCanvasRef!: ElementRef<HTMLCanvasElement>;

  @Input() actorGroupData: AnalyzedDocument[] | undefined;
  private pdfDocument: PDFDocumentProxy | null = null;
  private pdfPage: PDFPageProxy | null = null;
  private currentPageNumber = 1;
  private scale = 0.5;
  public totalPages = 0;
  public currentPage = 1;

  shapesToDraw: PdfShape[] = [
    {
      page: 1,
      type: 'rect',
      coords: [100, 700, 200, 750],
      color: 'red',
      lineWidth: 2,
    },
    {
      page: 1,
      type: 'rect',
      coords: [300, 600, 350, 680],
      color: 'blue',
      lineWidth: 1,
    },
    {
      page: 2,
      type: 'rect',
      coords: [50, 100, 150, 200],
      color: 'green',
      lineWidth: 3,
    },
  ];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    try {
      const pdfjs = pdfjsLib as any;
      pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs'; 
    } catch (error) {
      console.error('Error setting up PDF.js worker:', error);
    }
  }

  ngAfterViewInit(): void {
    this.loadPdf();
  }

  ngOnDestroy(): void {
    this.pdfDocument?.destroy();
  }

  // Loads PDF from dataService, sets up PDF.js document, and renders first page
  async loadPdf() {
    try {
      if (!this.pdfCanvasRef || !this.overlayCanvasRef) {
        console.error('Canvas elements not ready yet.');
        return;
      }

      const pdfFile: File | null | undefined = this.dataService.currentFile;

      if (!pdfFile) {
        console.warn('No current PDF file found in DataService.');
        return;
      }
      const arrayBuffer = await pdfFile.arrayBuffer();
      console.log('File read into ArrayBuffer.');
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });


      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      this.currentPageNumber = 1;
      this.currentPage = 1;
      this.renderPage(this.currentPageNumber);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  // private renderPage2(pageNumber: number): Observable<void>{
  // if (!this.pdfDocument) {
  // }
  //  }

  // Renders specified page to canvas with proper scaling and draws overlay
  async renderPage(pageNumber: number) {
    if (!this.pdfDocument) {
      return;
    }

    try {
      this.pdfPage = await this.pdfDocument.getPage(pageNumber);
      const viewport = this.pdfPage.getViewport({ scale: this.scale });

      const pdfCanvas = this.pdfCanvasRef.nativeElement;
      const pdfContext = pdfCanvas.getContext('2d');

      if (!pdfContext) {
        console.error('Failed to get PDF canvas context');
        return;
      }

      pdfCanvas.height = viewport.height;
      pdfCanvas.width = viewport.width;

      pdfCanvas.style.width = `${viewport.width}px`;
      pdfCanvas.style.height = `${viewport.height}px`;

      const renderContext = {
        canvasContext: pdfContext,
        viewport: viewport,
      };

      await this.pdfPage.render(renderContext).promise;

      this.drawOverlay();
    } catch (error) {
      console.error(`Error rendering page ${pageNumber}:`, error);
    } finally {
    }
  }

  // Draws shapes on overlay canvas, converting PDF coordinates to viewport coordinates
  drawOverlay() {
    if (!this.pdfPage || !this.overlayCanvasRef) return;

    const overlayCanvas = this.overlayCanvasRef.nativeElement;
    const overlayCtx = overlayCanvas.getContext('2d');
    const viewport = this.pdfPage.getViewport({ scale: this.scale });

    if (!overlayCtx) {
      console.error('Failed to get overlay canvas context');
      return;
    }

    overlayCanvas.width = viewport.width;
    overlayCanvas.height = viewport.height;
    overlayCanvas.style.width = `${viewport.width}px`;
    overlayCanvas.style.height = `${viewport.height}px`;

    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    const shapesForCurrentPage = this.shapesToDraw.filter(
      (shape) => shape.page === this.currentPageNumber
    );

    shapesForCurrentPage.forEach((shape) => {
      if (shape.type === 'rect') {
        const pdfCoords = shape.coords;
        const viewportRect = viewport.convertToViewportRectangle(pdfCoords);
        const [vx1, vy1, vx2, vy2] = viewportRect;

        const rectWidth = vx2 - vx1;
        const rectHeight = vy2 - vy1;

        overlayCtx.strokeStyle = shape.color || 'red';
        overlayCtx.lineWidth = shape.lineWidth || 1;

        overlayCtx.strokeRect(vx1, vy1, rectWidth, rectHeight);
      }

    });
  }

  goToPrevPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
      this.currentPage = this.currentPageNumber;
      this.renderPage(this.currentPageNumber);
    }
  }

  goToNextPage() {
    if (this.currentPageNumber < this.totalPages) {
      this.currentPageNumber++;
      this.currentPage = this.currentPageNumber;
      this.renderPage(this.currentPageNumber);
    }
  }

  zoomIn() {
    this.scale += 0.25;
    this.renderPage(this.currentPageNumber);
  }

  zoomOut() {
    if (this.scale > 0.3) {
      this.scale -= 0.25;
      this.renderPage(this.currentPageNumber);
    }
  }
}
