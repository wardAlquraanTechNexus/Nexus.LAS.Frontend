import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicListTable } from './dynamic-list-table';

describe('DynamicListTable', () => {
  let component: DynamicListTable;
  let fixture: ComponentFixture<DynamicListTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicListTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicListTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
