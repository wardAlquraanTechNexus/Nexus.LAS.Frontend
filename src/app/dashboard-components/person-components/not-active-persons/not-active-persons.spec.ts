import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotActivePersons } from './not-active-persons';

describe('NotActivePersons', () => {
  let component: NotActivePersons;
  let fixture: ComponentFixture<NotActivePersons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotActivePersons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotActivePersons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
