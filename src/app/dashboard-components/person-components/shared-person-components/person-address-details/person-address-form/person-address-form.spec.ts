import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddressForm } from './person-address-form';

describe('PersonAddressForm', () => {
  let component: PersonAddressForm;
  let fixture: ComponentFixture<PersonAddressForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAddressForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddressForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
