import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePersons } from './active-persons';

describe('ActivePersons', () => {
  let component: ActivePersons;
  let fixture: ComponentFixture<ActivePersons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivePersons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePersons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
