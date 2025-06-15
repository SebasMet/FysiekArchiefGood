import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOptionsComponent } from './report-options.component';
import { ReportModule } from '../../report.module';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ReportOptionsComponent', () => {
  let component: ReportOptionsComponent;
  let fixture: ComponentFixture<ReportOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportOptionsComponent ],
      imports: [ReportModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => 'test-uuid' 
              }
            }
          }
        },
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
