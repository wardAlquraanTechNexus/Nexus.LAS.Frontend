import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonTable } from './all-person-table';

describe('AllPersonTable', () => {
  let component: AllPersonTable;
  let fixture: ComponentFixture<AllPersonTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersonTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersonTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
