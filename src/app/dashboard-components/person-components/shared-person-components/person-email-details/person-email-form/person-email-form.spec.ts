import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEmailForm } from './person-email-form';

describe('PersonEmailForm', () => {
  let component: PersonEmailForm;
  let fixture: ComponentFixture<PersonEmailForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEmailForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonEmailForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
