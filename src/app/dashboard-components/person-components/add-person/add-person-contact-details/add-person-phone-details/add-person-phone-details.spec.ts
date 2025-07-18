import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonPhoneDetails } from './add-person-phone-details';

describe('AddPersonPhoneDetails', () => {
  let component: AddPersonPhoneDetails;
  let fixture: ComponentFixture<AddPersonPhoneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonPhoneDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonPhoneDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
