import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDocumentFormDialouge } from './person-document-form-dialouge';

describe('PersonDocumentFormDialouge', () => {
  let component: PersonDocumentFormDialouge;
  let fixture: ComponentFixture<PersonDocumentFormDialouge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonDocumentFormDialouge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonDocumentFormDialouge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
