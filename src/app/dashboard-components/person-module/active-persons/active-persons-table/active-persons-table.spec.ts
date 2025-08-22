import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePersonsTable } from './active-persons-table';

describe('ActivePersonsTable', () => {
  let component: ActivePersonsTable;
  let fixture: ComponentFixture<ActivePersonsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePersonsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePersonsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
