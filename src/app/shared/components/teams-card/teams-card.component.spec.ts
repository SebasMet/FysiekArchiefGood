import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsCardComponent } from './teams-card.component';
import { SharedModule } from '../../shared.module';

describe('TeamsCardComponent', () => {
  let component: TeamsCardComponent;
  let fixture: ComponentFixture<TeamsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsCardComponent ],
      imports: [SharedModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
