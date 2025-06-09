import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorSearchResultCardComponent } from './actor-search-result-card.component';
import { ReportModule } from '../../report.module';

describe('ActorSearchResultCardComponent', () => {
  let component: ActorSearchResultCardComponent;
  let fixture: ComponentFixture<ActorSearchResultCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorSearchResultCardComponent ],
      imports: [ReportModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorSearchResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
