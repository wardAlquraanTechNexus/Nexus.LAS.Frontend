import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOtherDocumentForm } from './person-other-document-form';

describe('PersonOtherDocumentForm', () => {
  let component: PersonOtherDocumentForm;
  let fixture: ComponentFixture<PersonOtherDocumentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOtherDocumentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOtherDocumentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
