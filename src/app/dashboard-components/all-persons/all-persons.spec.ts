import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersons } from './all-persons';

describe('AllPersons', () => {
  let component: AllPersons;
  let fixture: ComponentFixture<AllPersons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
