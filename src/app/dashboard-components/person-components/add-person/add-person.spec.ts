import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerson } from './add-person';

describe('AddPerson', () => {
  let component: AddPerson;
  let fixture: ComponentFixture<AddPerson>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPerson]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPerson);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
