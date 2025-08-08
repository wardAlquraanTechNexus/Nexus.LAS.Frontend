import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAddressDialouge } from './person-address-dialouge';

describe('PersonAddressDialouge', () => {
  let component: PersonAddressDialouge;
  let fixture: ComponentFixture<PersonAddressDialouge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAddressDialouge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAddressDialouge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
