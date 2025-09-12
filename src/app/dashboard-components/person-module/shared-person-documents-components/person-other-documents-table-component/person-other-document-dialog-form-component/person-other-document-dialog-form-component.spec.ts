import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOtherDocumentDialogFormComponent } from './person-other-document-dialog-form-component';

describe('PersonOtherDocumentDialogFormComponent', () => {
  let component: PersonOtherDocumentDialogFormComponent;
  let fixture: ComponentFixture<PersonOtherDocumentDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOtherDocumentDialogFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOtherDocumentDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
