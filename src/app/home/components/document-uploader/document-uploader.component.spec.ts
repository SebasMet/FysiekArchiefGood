import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUploaderComponent } from './document-uploader.component';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HomeModule } from '@home/home.module';

describe('DocumentUploaderComponent', () => {
  let component: DocumentUploaderComponent;
  let fixture: ComponentFixture<DocumentUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUploaderComponent ],
      imports: [HomeModule],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
