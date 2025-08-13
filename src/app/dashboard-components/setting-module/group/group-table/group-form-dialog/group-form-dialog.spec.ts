import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFormDialog } from './group-form-dialog';

describe('GroupFormDialog', () => {
  let component: GroupFormDialog;
  let fixture: ComponentFixture<GroupFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupFormDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFormDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
