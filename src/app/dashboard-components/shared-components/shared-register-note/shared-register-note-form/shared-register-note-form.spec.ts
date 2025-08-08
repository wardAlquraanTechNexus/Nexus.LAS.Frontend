import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRegisterNoteForm } from './shared-register-note-form';

describe('SharedRegisterNoteForm', () => {
  let component: SharedRegisterNoteForm;
  let fixture: ComponentFixture<SharedRegisterNoteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRegisterNoteForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRegisterNoteForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
