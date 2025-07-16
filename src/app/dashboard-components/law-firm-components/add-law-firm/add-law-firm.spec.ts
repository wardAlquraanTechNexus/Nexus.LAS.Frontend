import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLawFirm } from './add-law-firm';

describe('AddLawFirm', () => {
  let component: AddLawFirm;
  let fixture: ComponentFixture<AddLawFirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLawFirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLawFirm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
