import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIdDocumentForm } from './person-id-document-form';

describe('PersonIdDocumentForm', () => {
  let component: PersonIdDocumentForm;
  let fixture: ComponentFixture<PersonIdDocumentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonIdDocumentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonIdDocumentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
