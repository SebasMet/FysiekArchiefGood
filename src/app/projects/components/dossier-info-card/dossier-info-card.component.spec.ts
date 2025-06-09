import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierInfoCardComponent } from './dossier-info-card.component';
import { ProjectsModule } from '../../projects.module';

describe('DossierInfoCardComponent', () => {
  let component: DossierInfoCardComponent;
  let fixture: ComponentFixture<DossierInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierInfoCardComponent ],
      imports: [ProjectsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
