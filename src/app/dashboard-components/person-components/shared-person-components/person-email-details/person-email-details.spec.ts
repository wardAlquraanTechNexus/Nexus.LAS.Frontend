import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEmailDetails } from './person-email-details';

describe('PersonEmailDetails', () => {
  let component: PersonEmailDetails;
  let fixture: ComponentFixture<PersonEmailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonEmailDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonEmailDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
