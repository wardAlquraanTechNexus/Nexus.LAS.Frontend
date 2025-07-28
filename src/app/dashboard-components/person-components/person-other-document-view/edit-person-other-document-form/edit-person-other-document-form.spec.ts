import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonOtherDocumentForm } from './edit-person-other-document-form';

describe('EditPersonOtherDocumentForm', () => {
  let component: EditPersonOtherDocumentForm;
  let fixture: ComponentFixture<EditPersonOtherDocumentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPersonOtherDocumentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPersonOtherDocumentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
