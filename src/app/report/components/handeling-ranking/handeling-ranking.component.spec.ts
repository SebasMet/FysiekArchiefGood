import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandelingRankingComponent } from './handeling-ranking.component';

describe('HandelingRankingComponent', () => {
  let component: HandelingRankingComponent;
  let fixture: ComponentFixture<HandelingRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandelingRankingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandelingRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
