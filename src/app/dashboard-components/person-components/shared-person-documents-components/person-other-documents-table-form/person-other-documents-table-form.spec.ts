import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOtherDocumentsTableForm } from './person-other-documents-table-form';

describe('PersonOtherDocumentsTableForm', () => {
  let component: PersonOtherDocumentsTableForm;
  let fixture: ComponentFixture<PersonOtherDocumentsTableForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOtherDocumentsTableForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOtherDocumentsTableForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
