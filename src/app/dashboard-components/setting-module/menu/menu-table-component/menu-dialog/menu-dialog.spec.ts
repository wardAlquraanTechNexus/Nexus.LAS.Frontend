import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDialog } from './menu-dialog';

describe('MenuDialog', () => {
  let component: MenuDialog;
  let fixture: ComponentFixture<MenuDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
