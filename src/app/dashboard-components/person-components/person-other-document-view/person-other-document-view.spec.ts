import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOtherDocumentView } from './person-other-document-view';

describe('PersonOtherDocumentView', () => {
  let component: PersonOtherDocumentView;
  let fixture: ComponentFixture<PersonOtherDocumentView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOtherDocumentView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOtherDocumentView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
