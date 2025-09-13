import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonOverviewComponent } from './person-overview-component';

describe('PersonOverviewComponent', () => {
  let component: PersonOverviewComponent;
  let fixture: ComponentFixture<PersonOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
