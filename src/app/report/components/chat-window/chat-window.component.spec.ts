import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatWindowComponent } from './chat-window.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ReportModule } from '../../report.module';

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ChatWindowComponent],
      imports: [ReportModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test-id' }),
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'uuid') {
                    return 'test-uuid';
                  }
                  return null;
                }
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWindowComponent);
    // Act
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Act
    // Already done in beforeEach
    // Assert
    expect(component).toBeTruthy();
  });
});