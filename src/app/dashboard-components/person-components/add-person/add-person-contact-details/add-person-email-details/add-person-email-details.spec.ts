import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonEmailDetails } from './add-person-email-details';

describe('AddPersonEmailDetails', () => {
  let component: AddPersonEmailDetails;
  let fixture: ComponentFixture<AddPersonEmailDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonEmailDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonEmailDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
