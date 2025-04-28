import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit, // Import AfterViewInit
} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import {
  PDFDocumentProxy,
  PDFPageProxy,
} from 'pdfjs-dist/types/src/display/api'; // Import types
import { Observable, of } from 'rxjs';

// Define a type for our shapes (optional but good practice)
interface PdfShape {
  page: number; // Page number the shape belongs to
  type: 'rect'; // Type of shape
  coords: [number, number, number, number]; // PDF Coordinates [x1, y1, x2, y2] (bottom-left origin usually)
  color?: string; // Optional color
  lineWidth?: number; // Optional line width
}

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  standalone: false, // Keep as false if not using standalone components
})
export class PdfViewerComponent implements OnInit, AfterViewInit, OnDestroy {
  // --- Use ViewChild for the new canvas elements ---
  @ViewChild('pdfCanvas', { static: true })
  pdfCanvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('overlayCanvas', { static: true })
  overlayCanvasRef!: ElementRef<HTMLCanvasElement>;

  private pdfDocument: PDFDocumentProxy | null = null;
  private pdfPage: PDFPageProxy | null = null; // Store the current page object
  private currentPageNumber = 1;
  private scale = 1.5;
  public totalPages = 0;
  public currentPage = 1;

  // --- Define the shapes you want to draw ---
  // Coordinates are in PDF space (points, usually origin at bottom-left)
  // Example: Draw a red rectangle on page 1 from (100, 700) to (200, 750)
  // Remember: y-coordinate increases upwards in PDF space
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
  // -------------------------------------------

  constructor() {}

  ngOnInit(): void {
    // Worker setup can happen here
    try {
      const pdfjs = pdfjsLib as any;
      pdfjs.GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.min.mjs'; // Ensure this path is correct relative to your deployed assets
    } catch (error) {
      console.error('Error setting up PDF.js worker:', error);
    }
  }

  ngAfterViewInit(): void {
    // Load PDF after views are initialized so canvas refs are available
    this.loadPdf();
  }

  ngOnDestroy(): void {
    // Clean up resources if needed
    this.pdfDocument?.destroy();
  }

  // Load the PDF file
  async loadPdf() {
    try {
      if (!this.pdfCanvasRef || !this.overlayCanvasRef) {
        console.error('Canvas elements not ready yet.');
        return;
      }
      const loadingTask = pdfjsLib.getDocument('../../assets/sample.pdf'); // Path to your PDF file. Adjust if needed.
      this.pdfDocument = await loadingTask.promise;
      this.totalPages = this.pdfDocument.numPages;
      this.currentPageNumber = 1;
      this.currentPage = 1;
      this.renderPage(this.currentPageNumber);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  }

  private renderPage2(pageNumber: number): Observable<void>{
	if (!this.pdfDocument) {
	}
   }

  // Render a specific page of the PDF.
  async renderPage(pageNumber: number) {
    if (!this.pdfDocument) {
      return; // PDF not loaded
    }
    // Set loading state if desired

    try {
      this.pdfPage = await this.pdfDocument.getPage(pageNumber); // Store the page
      const viewport = this.pdfPage.getViewport({ scale: this.scale });

      const pdfCanvas = this.pdfCanvasRef.nativeElement;
      const pdfContext = pdfCanvas.getContext('2d');

      if (!pdfContext) {
        console.error('Failed to get PDF canvas context');
        return;
      }

      pdfCanvas.height = viewport.height;
      pdfCanvas.width = viewport.width;

      // Apply styles to the canvas if needed (e.g., for borders)
      pdfCanvas.style.width = `${viewport.width}px`;
      pdfCanvas.style.height = `${viewport.height}px`;

      const renderContext = {
        canvasContext: pdfContext,
        viewport: viewport,
      };

      await this.pdfPage.render(renderContext).promise;

      // --- Draw the overlay AFTER the page is rendered ---
      this.drawOverlay();
      // ---
    } catch (error) {
      console.error(`Error rendering page ${pageNumber}:`, error);
    } finally {
      // Clear loading state if set
    }
  }

  // --- Function to draw on the overlay canvas ---
  drawOverlay() {
    if (!this.pdfPage || !this.overlayCanvasRef) return; // Ensure page and canvas are available

    const overlayCanvas = this.overlayCanvasRef.nativeElement;
    const overlayCtx = overlayCanvas.getContext('2d');
    const viewport = this.pdfPage.getViewport({ scale: this.scale }); // Get current viewport

    if (!overlayCtx) {
      console.error('Failed to get overlay canvas context');
      return;
    }

    // --- Match overlay canvas size to the PDF canvas size ---
    overlayCanvas.width = viewport.width;
    overlayCanvas.height = viewport.height;
    overlayCanvas.style.width = `${viewport.width}px`; // Keep CSS size in sync too
    overlayCanvas.style.height = `${viewport.height}px`;

    // Clear previous drawings on the overlay
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // --- Filter shapes for the current page ---
    const shapesForCurrentPage = this.shapesToDraw.filter(
      (shape) => shape.page === this.currentPageNumber
    );

    // --- Draw each shape ---
    shapesForCurrentPage.forEach((shape) => {
      if (shape.type === 'rect') {
        // Convert PDF coordinates [x1, y1, x2, y2] to viewport coordinates
        // pdfCoords are [bottomLeftX, bottomLeftY, topRightX, topRightY]
        const pdfCoords = shape.coords;
        // viewportRect is [topLeftX, topLeftY, bottomRightX, bottomRightY] in pixels
        const viewportRect = viewport.convertToViewportRectangle(pdfCoords);
        const [vx1, vy1, vx2, vy2] = viewportRect;

        // Calculate width and height for drawing (in viewport pixels)
        const rectWidth = vx2 - vx1;
        const rectHeight = vy2 - vy1;

        // Set drawing styles
        overlayCtx.strokeStyle = shape.color || 'red'; // Default to red
        overlayCtx.lineWidth = shape.lineWidth || 1; // Default to 1

        // Draw the rectangle
        overlayCtx.strokeRect(vx1, vy1, rectWidth, rectHeight);
      }
      // Add logic for other shape types here if needed (e.g., 'circle', 'line')
    });
  }
  // --- End overlay drawing ---

  // Navigate to the previous page.
  goToPrevPage() {
    if (this.currentPageNumber > 1) {
      this.currentPageNumber--;
      this.currentPage = this.currentPageNumber;
      this.renderPage(this.currentPageNumber); // renderPage now calls drawOverlay
    }
  }

  // Navigate to the next page.
  goToNextPage() {
    if (this.currentPageNumber < this.totalPages) {
      this.currentPageNumber++;
      this.currentPage = this.currentPageNumber;
      this.renderPage(this.currentPageNumber); // renderPage now calls drawOverlay
    }
  }

  // Zoom in to the PDF.
  zoomIn() {
    this.scale += 0.25;
    this.renderPage(this.currentPageNumber); // Re-render and redraw overlay
  }

  // Zoom out of the PDF.
  zoomOut() {
    if (this.scale > 0.3) {
      // Prevent zooming out too much
      this.scale -= 0.25;
      this.renderPage(this.currentPageNumber); // Re-render and redraw overlay
    }
  }
}
