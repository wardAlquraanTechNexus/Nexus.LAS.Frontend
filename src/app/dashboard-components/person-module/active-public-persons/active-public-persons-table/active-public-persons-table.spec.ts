import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePublicPersonsTable } from './active-public-persons-table';

describe('ActivePublicPersonsTable', () => {
  let component: ActivePublicPersonsTable;
  let fixture: ComponentFixture<ActivePublicPersonsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePublicPersonsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePublicPersonsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
