import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIdDocumentFormDialogComponent } from './person-id-document-form-dialog-component';

describe('PersonIdDocumentFormDialogComponent', () => {
  let component: PersonIdDocumentFormDialogComponent;
  let fixture: ComponentFixture<PersonIdDocumentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonIdDocumentFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonIdDocumentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
