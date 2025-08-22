import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTableView } from './person-table-view';

describe('PersonTableView', () => {
  let component: PersonTableView;
  let fixture: ComponentFixture<PersonTableView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonTableView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonTableView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
