import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPersonDetails } from './add-person-details';

describe('AddPersonDetails', () => {
  let component: AddPersonDetails;
  let fixture: ComponentFixture<AddPersonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPersonDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPersonDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
