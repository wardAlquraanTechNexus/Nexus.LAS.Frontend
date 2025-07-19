import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPhoneDetails } from './person-phone-details';

describe('PersonPhoneDetails', () => {
  let component: PersonPhoneDetails;
  let fixture: ComponentFixture<PersonPhoneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPhoneDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonPhoneDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
