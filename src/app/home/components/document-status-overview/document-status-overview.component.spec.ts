import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStatusOverviewComponent } from './document-status-overview.component';
import { HomeModule } from '@home/home.module';

describe('DocumentStatusOverviewComponent', () => {
  let component: DocumentStatusOverviewComponent;
  let fixture: ComponentFixture<DocumentStatusOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentStatusOverviewComponent ],
      imports: [HomeModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentStatusOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
