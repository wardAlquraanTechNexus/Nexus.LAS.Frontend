import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsTapsComponent } from './settings-taps-component';

describe('SettingsTapsComponent', () => {
  let component: SettingsTapsComponent;
  let fixture: ComponentFixture<SettingsTapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTapsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsTapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
