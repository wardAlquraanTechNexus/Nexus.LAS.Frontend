import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRealEstate } from './add-real-estate';

describe('AddRealEstate', () => {
  let component: AddRealEstate;
  let fixture: ComponentFixture<AddRealEstate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRealEstate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRealEstate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
