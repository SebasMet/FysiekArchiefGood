import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandelingResultHeaderComponent } from './handeling-result-header.component';

describe('HandelingResultHeaderComponent', () => {
  let component: HandelingResultHeaderComponent;
  let fixture: ComponentFixture<HandelingResultHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandelingResultHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandelingResultHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
