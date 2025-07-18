import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonAddressDetails } from './add-person-address-details';

describe('AddPersonAddressDetails', () => {
  let component: AddPersonAddressDetails;
  let fixture: ComponentFixture<AddPersonAddressDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonAddressDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonAddressDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
