import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusOverviewTableComponent } from './status-overview-table.component';
import { HomeModule } from '@home/home.module';

describe('StatusOverviewTableComponent', () => {
  let component: StatusOverviewTableComponent;
  let fixture: ComponentFixture<StatusOverviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusOverviewTableComponent ],
      imports: [HomeModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
