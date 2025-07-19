import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddressDetails } from './person-address-details';

describe('PersonAddressDetails', () => {
  let component: PersonAddressDetails;
  let fixture: ComponentFixture<PersonAddressDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAddressDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddressDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
