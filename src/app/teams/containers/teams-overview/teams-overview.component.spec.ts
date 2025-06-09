import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsOverviewComponent } from './teams-overview.component';
import { TeamsModule } from '../../teams.module';
import { NgIconsModule } from '@ng-icons/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('TeamsOverviewComponent', () => {
  let component: TeamsOverviewComponent;
  let fixture: ComponentFixture<TeamsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsOverviewComponent ],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient()
      ],      
      imports: [TeamsModule, NgIconsModule.withIcons({})]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
