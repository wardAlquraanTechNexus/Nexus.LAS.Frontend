import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonContactDetails } from './add-person-contact-details';

describe('AddPersonContactDetails', () => {
  let component: AddPersonContactDetails;
  let fixture: ComponentFixture<AddPersonContactDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonContactDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonContactDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
