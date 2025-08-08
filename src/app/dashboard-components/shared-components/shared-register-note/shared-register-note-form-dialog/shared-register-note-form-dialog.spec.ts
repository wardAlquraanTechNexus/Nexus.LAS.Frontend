import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedRegisterNoteFormDialog } from './shared-register-note-form-dialog';

describe('SharedRegisterNoteFormDialog', () => {
  let component: SharedRegisterNoteFormDialog;
  let fixture: ComponentFixture<SharedRegisterNoteFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedRegisterNoteFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedRegisterNoteFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
