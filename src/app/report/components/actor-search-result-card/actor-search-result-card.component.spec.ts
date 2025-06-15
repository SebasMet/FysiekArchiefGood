import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActorSearchResultCardComponent } from './actor-search-result-card.component';

const MOCK_ACTOR_GROUP_DATA_5_PAGES = {
  name: 'Manuel Lopez',
  whatDidTheyDo: "This is a very interesting detailed description of the actor's actions.",
  pages: [
    { pageNumber: 1, base64Image: 'base64_1' },
    { pageNumber: 2, base64Image: 'base64_2' },
    { pageNumber: 3, base64Image: 'base64_3' },
    { pageNumber: 4, base64Image: 'base64_4' },
    { pageNumber: 5, base64Image: 'base64_5' },
  ],
};

const MOCK_ACTOR_GROUP_DATA_2_PAGES = {
  name: 'Jan Pepernoot',
  whatDidTheyDo: 'A different description for this actor.',
  pages: [
    { pageNumber: 10, base64Image: 'base64_10' },
    { pageNumber: 11, base64Image: 'base64_11' },
  ],
};

describe('ActorSearchResultCardComponent', () => {
  let component: ActorSearchResultCardComponent;
  let fixture: ComponentFixture<ActorSearchResultCardComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    // Arrange
    await TestBed.configureTestingModule({
      declarations: [ActorSearchResultCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ActorSearchResultCardComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
  });

  it('should display actor data, 3 thumbnails, and a "more" message for more than 3 pages', () => {
    // Arrange
    component.actorGroupData = MOCK_ACTOR_GROUP_DATA_5_PAGES;
    // Act
    fixture.detectChanges();

    const headerElement = nativeElement.querySelector('h1');
    const paragraphElement = nativeElement.querySelector('p');
    const thumbnailElements = nativeElement.querySelectorAll('[hlmCardFooter] button');
    const moreMessageElement = nativeElement.querySelector('[hlmCardFooter] div.text-gray-500');

    // Assert
    expect(headerElement?.textContent?.trim()).toBe(MOCK_ACTOR_GROUP_DATA_5_PAGES.name);
    expect(paragraphElement?.textContent?.trim()).toBe(MOCK_ACTOR_GROUP_DATA_5_PAGES.whatDidTheyDo);
    expect(thumbnailElements.length).toBe(3);
    expect(moreMessageElement?.textContent).toContain(`... and 2 more`);
  });

  it('should display correct thumbnails and no "more" message for 3 or fewer pages', () => {
    // Arrange
    component.actorGroupData = MOCK_ACTOR_GROUP_DATA_2_PAGES;
    // Act
    fixture.detectChanges();

    const thumbnailElements = nativeElement.querySelectorAll('[hlmCardFooter] button');
    const moreMessageElement = nativeElement.querySelector('[hlmCardFooter] div.text-gray-500');

    // Assert
    expect(thumbnailElements.length).toBe(2);
    expect(moreMessageElement).toBeFalsy();
  });
});