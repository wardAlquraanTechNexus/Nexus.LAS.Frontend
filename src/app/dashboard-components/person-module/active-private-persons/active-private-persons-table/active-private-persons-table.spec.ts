import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePrivatePersonsTable } from './active-private-persons-table';

describe('ActivePrivatePersonsTable', () => {
  let component: ActivePrivatePersonsTable;
  let fixture: ComponentFixture<ActivePrivatePersonsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePrivatePersonsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePrivatePersonsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
