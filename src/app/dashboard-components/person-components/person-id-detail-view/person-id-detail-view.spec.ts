import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIdDetailView } from './person-id-detail-view';

describe('PersonIdDetailView', () => {
  let component: PersonIdDetailView;
  let fixture: ComponentFixture<PersonIdDetailView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonIdDetailView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonIdDetailView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
