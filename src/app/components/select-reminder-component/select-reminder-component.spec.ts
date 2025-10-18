import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReminderComponent } from './select-reminder-component';

describe('SelectReminderComponent', () => {
  let component: SelectReminderComponent;
  let fixture: ComponentFixture<SelectReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectReminderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
